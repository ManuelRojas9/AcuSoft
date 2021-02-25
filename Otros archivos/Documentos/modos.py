import numpy as np
import math

# p = 1
# q = 1
 
# print(d)
# while q < 9:
#     q += 1
#     d[1] = q
#     print (d)
#     if q == 9:
#         p += 1
#         d[0] = p
#         q = 0
#         if p == 10:
#             break
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

class room():
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
        self.d = np.array([x,y,z])
        
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
        self.pq = math.ceil((2*(500*2**(1/6.0))*d1*d2/343)/((d1**2+d2**2)**(1/2.0)))
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
        
                   

R = room(3,4,5)

x = np.array(R.modo_axial(R.x))
y = np.array(R.modo_axial(R.y))
z = np.array(R.modo_axial(R.z))

conteo_x = R.conteo_axial(x)
conteo_y = R.conteo_axial(y)
conteo_z = R.conteo_axial(z)

xz = np.array(R.modo_tangencial(R.x,R.z))
xy = np.array(R.modo_tangencial(R.x,R.y))
zy = np.array(R.modo_tangencial(R.z,R.y))

conteo_xz = R.conteo_tangencial(xz)
conteo_xy = R.conteo_tangencial(xy)
conteo_zy = R.conteo_tangencial(zy)

xyz = R.modo_oblicuo()





        



        
