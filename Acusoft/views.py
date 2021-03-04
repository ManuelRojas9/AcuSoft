from django.http import HttpResponse
from django.template import Template, Context
from django.template import loader
from django.shortcuts import render

import os
import numpy as np
import csv
import pandas as pd
import math
import json


def home(request):
    Index_Loader = loader.get_template('index.html')
    Index_Template = Index_Loader.render({})
    return HttpResponse(Index_Template)

def login(request):
    login_loader = loader.get_template('login.html')
    login_template = login_loader.render({})
    return HttpResponse(login_template)

def user_inicio(request):
    user_loader =loader.get_template('user_inicio.html')
    user_template = user_loader.render({})
    return HttpResponse(user_template)

def user_proyectos(request):
    user_loader =loader.get_template('user_proyectos.html')
    user_template = user_loader.render({})
    return HttpResponse(user_template)

def user_proyecto1(request):
    user_loader =loader.get_template('user_proyecto1.html')
    user_template = user_loader.render({})
    return HttpResponse(user_template)

def user_nuevoarchivo(request):
    user_loader =loader.get_template('user_nuevoarchivo.html')
    user_template = user_loader.render({})
    return HttpResponse(user_template)

clear = lambda: os.system("cls")
f = pd.read_csv("CoefAcu.csv")
pd.DataFrame(f)

reader = csv.reader(open('CoefAcu.csv'))

Materiales = {}
for row in reader:
   key = row[0]
   if key in Materiales:
       pass
   milistafloat = []
   for item in row[1:]:
       milistafloat.append(float(item))
   Materiales[key] = milistafloat
   
bw3 = 31.25
bw2 = bw3/2**(1/3.0)
bw1 = bw2/2**(1/3.0)

Tercios_Octava = np.array([bw1,bw2,bw3])
Tercios_Octava2 = np.array([bw1,bw2,bw3])
for i in range (2,6,1):
    Tercios_Octava2 = np.array(Tercios_Octava2*2)
    Tercios_Octava  = np.concatenate((Tercios_Octava,Tercios_Octava2),axis=None)
    
Tercios_Octava_Low  = Tercios_Octava/2**(1/6)
Tercios_Octava_High = Tercios_Octava*2**(1/6)

n = 17

class room():
    def __init__(self, x, y, z, RT60ideal):
        self.x = x
        self.y = y
        self.z = z
        self.v = x*y*z
        self.a = 2*(x*y+x*z+y*z)
        self.RT60ideal = RT60ideal
        self.d = np.array([x,y,z])

    def Calcular(self,T, P, WF, WB, WL, WR, v, a, ssaW):
        self.sa    = T + P + WF + WB + WL + WR + ssaW
        self.RT60f = -0.161*v/(a*np.log(1-(self.sa/a)))
        self.RT60  = np.mean(self.RT60f)
        self.dev = (np.mean((self.RT60f-self.RT60)**2))**(1/2.0)
        self.dif = self.RT60ideal - self.RT60

    def modo_axial(self, d):
        self.axial = []
        self.n = math.ceil((2*(500*2**(1/6.0))*np.amax(self.d))/343)
        f = (343/2)*(((self.n**2)/(d**2))**(1/2.0))
        for i in range(1,self.n+1,1):
            f = 343/2*i/d
            self.axial.append(f)
        
        return self.axial
    
    def conteo_axial(self,dimension):
        self.ConteoModos_Axial = np.zeros((1,15))
        for e in range (0,len(dimension),1):
            for i in range(0,len(Tercios_Octava_Low),1):
                if dimension[e] > Tercios_Octava_Low[i] and dimension[e] < Tercios_Octava_High[i]:
                    self.ConteoModos_Axial[0,i] += 1
        return self.ConteoModos_Axial

    def modo_tangencial(self,d1,d2):
        d = [1,1]
        p = 1
        q = 1
        self.tangencial = []
        f = (343/2)*(((d[0]**2)/(d1**2)+((d[1]**2)/(d2**2)))**(1/2.0))
        self.pq = math.ceil((2*(500*2**(1/6.0))*(d1)*(d2)/343)/((d1**2+d2**2)**(1/2.0)))
        self.tangencial.append(f)
        while q < self.pq:
            q += 1
            d[1] = q
            f = (343/2)*(((d[0]**2)/(d1**2)+((d[1]**2)/(d2**2)))**(1/2.0))
            self.tangencial.append(f)
            if q == self.pq:
                p += 1
                d[0] = p
                q = 0
                if p == self.pq+1:
                    break
        return self.tangencial

    def conteo_tangencial(self,par_dimensiones):
        self.ConteoModos_Tangencial = np.zeros((1,15))
        for e in range (0,len(par_dimensiones),1):
            for i in range(0,len(Tercios_Octava_Low),1):
                if par_dimensiones[e] > Tercios_Octava_Low[i] and par_dimensiones[e] < Tercios_Octava_High[i]:
                    self.ConteoModos_Tangencial[0,i] += 1
        return self.ConteoModos_Tangencial

    def modo_oblicuo(self):
        d = [1,1,1]
        p = 1
        q = 1
        a = math.ceil((2*(500*2**(1/6.0))*self.x*self.y*self.z/343)/((((self.x**2+self.y**2)*self.z**2)+self.x*self.y)**(1/2.0)))
        if a < 9:
            a = 9
        self.oblicuo = []
         
        f = (343/2)*(((d[0]**2)/(self.x**2)+((d[1]**2)/(self.y**2))+((d[2]**2)/(self.z**2)))**(1/2.0))
        self.oblicuo.append(f)
        while q < a:
            q += 1
            d[2] = q
            f = (343/2)*(((d[0]**2)/(self.x**2)+((d[1]**2)/(self.y**2))+((d[2]**2)/(self.z**2)))**(1/2.0))
            self.oblicuo.append(f)
            if q == a:
                p += 1
                d[1] = p
                q = 0
                if p == a+1:
                    d[0] += 1
                    q = 1
                    p = 1
                    d[2] = q
                    d[1] = p
                    if d[0] != a+1:
                        f = (343/2)*(((d[0]**2)/(self.x**2)+((d[1]**2)/(self.y**2))+((d[2]**2)/(self.z**2)))**(1/2.0))
                        self.oblicuo.append(f)
                    if d[0] == a+1:
                        break
        return self.oblicuo

    def conteo_oblicuo(self,xyz):
        self.ConteoModos_Oblicuo = np.zeros((1,15))
        for e in range (0,len(xyz),1):
            for i in range(0,len(Tercios_Octava_Low),1):
                if xyz[e] > Tercios_Octava_Low[i] and xyz[e] < Tercios_Octava_High[i]:
                    self.ConteoModos_Oblicuo[0,i] += 1
        return self.ConteoModos_Oblicuo

class wall():
    def __init__(self,Nombre,N,d1,d2):
        self.Nombre = Nombre
        self.Wall   = N
        self.Ancho  = d1
        self.Largo  = d2
        self.aW     = d1*d2

    def mat(self,m):
        self.MNombre  = m
        self.MCoefAcu = Materiales[self.MNombre] 

    def saWall(self):
        self.saW = self.aW*np.array(self.MCoefAcu)

    def restaWall(self,aOW):
        self.aOW = aOW
        self.aW -= self.aOW   

class objWall(wall):
    def mat(self,m):
        self.MNombre  = m
        self.MCoefAcu = Materiales[self.MNombre] 

    def saWall(self ):
        self.saW = self.aW*np.array(self.MCoefAcu)
    
    def ssaWall(self,ssaW):
        ssaW = ssaW

def estudiorecinto(request):
    estudiorecinto_loader =loader.get_template('estudiorecinto.html')
    estudiorecinto_template = estudiorecinto_loader.render({"Materiales":Materiales})
    return HttpResponse(estudiorecinto_template)

def estudiorecinto_resp(request):
    clear()
    if request.method == "GET":

        R = room (float(request.GET.get("x")),
                  float(request.GET.get("y")),
                  float(request.GET.get("z")),
                  float(request.GET.get("RT60_ideal")))

        T  = wall("Techo",          "T",      R.x,R.z)
        P  = wall("Piso",           "P",      R.x,R.z)
        WF = wall("Pared Frontal",  "WF",     R.x,R.y)
        WB = wall("Pared trasera",  "WB",     R.x,R.y)
        WL = wall("Pared izquierda","WL",     R.z,R.y)
        WR = wall("Pared derecha",  "WR",     R.z,R.y)

        T.mat(request.GET.get("Material_T"))
        P.mat(request.GET.get("Material_P"))
        WF.mat(request.GET.get("Material_WF"))
        WB.mat(request.GET.get("Material_WB"))
        WL.mat(request.GET.get("Material_WL"))
        WR.mat(request.GET.get("Material_WR"))

        ssaW = np.zeros([1,6])
        objetos = {}
        sobjsaW = []
        objCoef = []  

        if (request.GET.get('Extras') != None):       
            Extras = json.loads(request.GET.get('Extras'))

            n = 0
            i = 0
            while i < len(Extras):
                clear()
                obj = Extras[n]

                objx = objWall( obj[1],
                                obj[2], 
                                float(obj[3]), 
                                float(obj[4]))  
                    
                objx.mat(obj[5])
                    
                if   objx.Wall == "Techo":              T.restaWall(objx.aW)
                elif objx.Wall == "Piso":               P.restaWall(objx.aW)
                elif objx.Wall == "Pared Frontal":      WF.restaWall(objx.aW)
                elif objx.Wall == "Pared Trasera":      WB.restaWall(objx.aW)
                elif objx.Wall == "Pared Izquierda":    WL.restaWall(objx.aW)
                elif objx.Wall == "Pared Derecha":      WR.restaWall(objx.aW)            
                                            
                objx.saWall()
                
                objetos[n]=[objx.Nombre,objx.Wall,objx.aW,objx.MNombre,objx.saW]
                sobjsaW.append(np.around(objx.saW,2,None).tolist())

                objCoef.append(objx.MCoefAcu)      
                ssaW += np.array(objx.saW)
                n += 1
                i += 1
                                    
        else:
            Extras = None       

        T. saWall()
        P. saWall()
        WF.saWall()
        WB.saWall()
        WL.saWall()
        WR.saWall()

        saTnp = np.around(T .saW,2,None)
        saPnp = np.around(P .saW,2,None)
        saWFnp = np.around(WF .saW,2,None)
        saWBnp = np.around(WB .saW,2,None)
        saWLnp = np.around(WL .saW,2,None)
        saWRnp = np.around(WR .saW,2,None)

        saT = saTnp.tolist()
        saP = saPnp.tolist()
        saWF = saWFnp.tolist()
        saWB = saWBnp.tolist()
        saWL = saWLnp.tolist()
        saWR = saWRnp.tolist()

        R.Calcular( T.saW, 
                    P.saW, 
                    WF.saW, 
                    WB.saW, 
                    WL.saW, 
                    WR.saW, 

                    R.v, 
                    R.a,
                    ssaW )

        RT60f = np.around(R.RT60f,2,None)
        RT60f = RT60f.tolist()

        x = np.array(R.modo_axial(R.x))
        y = np.array(R.modo_axial(R.y))
        z = np.array(R.modo_axial(R.z))

        conteo_x = R.conteo_axial(x)
        conteo_y = R.conteo_axial(y)
        conteo_z = R.conteo_axial(z)
        conteoA_suma = conteo_x + conteo_y + conteo_z    

        xz = np.array(R.modo_tangencial(R.x,R.z))
        xy = np.array(R.modo_tangencial(R.x,R.y))
        zy = np.array(R.modo_tangencial(R.z,R.y))

        xz = np.sort(xz, axis=None)
        xy = np.sort(xy, axis=None)
        zy = np.sort(zy, axis=None)

        conteo_xz = R.conteo_tangencial(xz)
        conteo_xy = R.conteo_tangencial(xy)
        conteo_zy = R.conteo_tangencial(zy)
        conteoT_suma = conteo_xy + conteo_xz + conteo_zy

        xyz = np.array(R.modo_oblicuo())
        xyz = np.sort(xyz, axis=None)
        conteo_xyz = R.conteo_oblicuo(xyz)

        SumaConteoTotal = conteo_xyz + conteo_xy + conteo_xz + conteo_zy + conteo_x + conteo_y + conteo_z

    datos = {
            "x"   :R.x,
            "y"   :R.y,
            "z"   :R.z,
            
            "v"   :np.around(R.v,2,None),
            "a"   :np.around(R.a,2,None),

            "sT"  :np.around(T.aW,2,None),
            "sP"  :np.around(P.aW,2,None),
            "sWF" :np.around(WF.aW,2,None),
            "sWB" :np.around(WB.aW,2,None),
            "sWL" :np.around(WL.aW,2,None),
            "sWR" :np.around(WR.aW,2,None),

            "lT"  :T.Largo,
            "lP"  :P.Largo,
            "lWF" :WF.Largo,
            "lWB" :WB.Largo,
            "lWL" :WL.Largo,
            "lWR" :WR.Largo,

            "aT"  :T.Ancho,
            "aP"  :P.Ancho,
            "aWF" :WF.Ancho,
            "aWB" :WB.Ancho,
            "aWL" :WL.Ancho,
            "aWR" :WR.Ancho,
                        
            "matT"  :T.MNombre,
            "matP"  :P.MNombre,      
            "matWF" :WF.MNombre,
            "matWB" :WB.MNombre,
            "matWL" :WL.MNombre,
            "matWR" :WR.MNombre,

            "saT" : saT,
            "saP" : saP,
            "saWF" : saWF,
            "saWB" : saWB,
            "saWL" : saWL,
            "saWR" : saWR,

            "cT"  :T.MCoefAcu,
            "cP"  :P.MCoefAcu,
            "cWF" :WF.MCoefAcu,
            "cWB" :WB.MCoefAcu,
            "cWL" :WL.MCoefAcu,
            "cWR" :WR.MCoefAcu,

            "ssaW":ssaW.tolist(),
            "sobjsaW":sobjsaW,
            "Extras": Extras,
            "objCoef":objCoef,

            "RT60f":RT60f,
            "dev":round(R.dev,3),
            "dif":round(R.dif,3),
            "RT60":round(R.RT60,3),

            "n":R.n,
            "conteo_x":conteo_x.tolist(),
            "conteo_y":conteo_y.tolist(),
            "conteo_z":conteo_z.tolist(),
            "axial_x":x.tolist(),
            "axial_y":y.tolist(),
            "axial_z":z.tolist(),
            "conteoA_suma":conteoA_suma.tolist(),

            "conteo_xz":conteo_xz.tolist(),
            "conteo_xy":conteo_xy.tolist(),
            "conteo_zy":conteo_zy.tolist(),
            "tangencial_xy":xy.tolist(),
            "tangencial_xz":xz.tolist(),
            "tangencial_zy":zy.tolist(),
            "conteoT_suma":conteoT_suma.tolist(),

            "conteo_xyz":conteo_xyz.tolist(),
            "oblicuo_xyz":xyz.tolist(),

            "SumaConteoTotal":SumaConteoTotal.tolist() 
    }

    return HttpResponse(json.dumps(datos), content_type='application/json')

class Resonador():
    def __init__(self,fr,q):
        self.fr = fr
        self.q  = q
        self.bw = fr/q
        self.fh = fr + self.bw/2
        self.fl = fr - self.bw/2
        self.RT60 = 2.2/self.bw
        
class Difragmatico(Resonador):
    def panelD(self, b, h, mat):
        self.b = b
        self.h = h
        self.mat = mat
        self.m = Densidades[self.mat]
        self.d = self.m/(b*h)
        self.e = ((6/self.fr)**2)/self.d


class Perforado(Resonador):
    def panelP(self, b, h, g, d, p):
        self.b = b
        self.h = h
        self.g = g
        self.d = d
        self.p = p
        self.s = ((78.5*(2.54*d)**2)/p)**(1/2.0)
        self.nb = round((b/self.s)-1)
        self.nh = round((h/self.s)-1)
        self.n = self.nb*self.nh
        self.e = ((548/self.fr)**2)*(p/(g+0.8*(2.54*d)))
        self.borde_altura = (self.b - (round(self.s,2)*(self.nb-1)))/2
        self.borde_base = (self.h - (round(self.s,2)*(self.nh-1)))/2

reader = csv.reader(open('DensidadesSuperficiales.csv'))

Densidades = {}
for row in reader:
   key = row[0]
   if key in Densidades:
       pass
   milistafloat = []
   for item in row[1:]:
       milistafloat.append(float(item))
   Densidades[key] = float(item)

print(Densidades)

def disenopaneles(request):
    disenopaneles_Loader = loader.get_template('diseñopaneles.html')
    disenopaneles_Template = disenopaneles_Loader.render({"Densidades":Densidades})
    return HttpResponse(disenopaneles_Template)

def disenopaneles_resp(request):
    if request.method == "GET":
        clear()      
        Tipo = request.GET.get("tipo")
        print(Tipo)
        if Tipo == "Diafragmático":
            P = Difragmatico(   float(request.GET.get("f")),
                                float(request.GET.get("q")))

            P.panelD(   float(request.GET.get("db")),
                        float(request.GET.get("dh")),
                        request.GET.get("dm")
            )

            datos = {
                "f":P.fr,
                "q":P.q,

                "bw":round(P.bw,2),
                "fh":round(P.fh,2),
                "fl":round(P.fl,2),
                "RT60":round(P.RT60,3),

                "db":P.b,
                "dh":P.h,
                "dm":P.m,
                "dd":round(P.d*100000,2),
                "de":round(P.e,2)
            }

        if Tipo == "Perforado":
            P = Perforado(   float(request.GET.get("f")),
                            float(request.GET.get("q")))

            P.panelP(   float(request.GET.get("pb")),
                        float(request.GET.get("ph")),
                        float(request.GET.get("pg")),
                        float(request.GET.get("pd")),
                        float(request.GET.get("pp")),
            )

            print(P.borde_base)
            print(P.borde_altura)

            datos = {
                "f":P.fr,
                "q":P.q,
                "bw":round(P.bw,2),
                "fh":round(P.fh,2),
                "fl":round(P.fl,2),
                "RT60":round(P.RT60,3),

                "pb":P.b,
                "ph":P.h,
                "pg":P.g,
                "pd":P.d,
                "pp":P.p,
                "pnb":P.nb,
                "pnh":P.nh,

                "pn":round(P.n),
                "ps":round(P.s,2),
                "pe":round(P.e,2),

                "borde_base":round(P.borde_base,2),
                "borde_altura":round(P.borde_altura,2)
            }

    return HttpResponse(json.dumps(datos), content_type='application/json')