# -*- coding: utf-8 -*-
"""
Created on Thu Jan 28 23:51:31 2021

@author: Manuel
"""
d = [1,1]
p = 1
q = 1
a = 11

print(d)
while q < a:
    q += 1
    d[1] = q
    print (d)
    if q == a:
        p += 1
        d[0] = p
        q = 0
        if p == a + 1:
            break