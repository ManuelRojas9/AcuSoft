import numpy as np
import math

def contadores():
    d = [0,0,0]
    p = 0
    q = 0
    a = 8

    modos = []

    while q < a:
        q += 1
        d[2] = q

        modos.append([d[0],d[1],d[2]])

        if q == a:
            p += 1 
            d[1] = p            
            q = 0
            d[2] = q
            if d[1] != a+1:
                modos.append([d[0],d[1],d[2]])
            if p == a+1:
                d[0] += 1
                q = 0
                p = 0
                d[2] = q
                d[1] = p
                if d[0] != a+1:
                    
                    modos.append([d[0],d[1],d[2]])


                if d[0] == a+1:
                    break
    return modos
                   
modos = contadores()

def frecuencias_modales(x,y,z):
    lista_frecuencias_modales = []
    for i in modos:
        lista_frecuencias_modales.append(
                (343/2)*
                    (
                        (np.array(i[0])/x)**2 + (np.array(i[1])/y)**2 + (np.array(i[2])/z)**2
                    )**(1/2.0)
                )
    
    return lista_frecuencias_modales

def NumeroModos(f,x,y,z):
    c = 343
    l = 4*(x+y+z)
    s = 2*(x*y + x*z + y*z)
    v = x*y*z
    Nf = math.floor((4*math.pi/3)*v*(f/c)**3 + (math.pi/4)*s*(f/c)**2 + (l/8)*f/c)
    Df = (4*math.pi*v*f**2)/c**3
    return [Nf,Df]


    

lista = frecuencias_modales(3,4,5)

NumeroDeModos = NumeroModos(309, 3, 4, 5)

Modos = {}

Modos[lista[0]] = "hola"

        






        



        
