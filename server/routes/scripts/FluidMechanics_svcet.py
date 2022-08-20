import json
import math as m
import re

class FML_svcet:
    def __init__(self, arg):
        self.arg = arg

    def Flow_Through_Orifice_SVCET(self):
        argument = self.arg[0:]
        def X(a,b):return((a-b)/100)
        d1 = float(argument[1])
        d2 = float(argument[2])
        A = float(argument[3])
        h = float(argument[4])
        Sm=float(argument[5])
        Sw=float(argument[6])
        g=float(argument[7])
        Kine=float(argument[8])
        l= float(argument[9])
        A1= int(0.785*(d1**2))
        def Hf(a):return((a*((Sm-Sw)/Sw)))
        def Q(a):return((A*h)/a*10000)
        def RE(a):return(((a*2)/(0.89))*10**6)
        X1 = X(float(argument[10]),float(argument[11]))
        X2 = X(float(argument[13]),float(argument[14]))
        X3 = X(float(argument[16]),float(argument[17]))
        Hf1=Hf(X1)
        Hf2=Hf(X2)
        Hf3=Hf(X3)
        Qact1 =round(Q(float(argument[12])),2)
        Qact2 =round(Q(float(argument[15])),2)
        Qact3 =round(Q(float(argument[18])),2)
        V1 = round((Qact1/A1),4)
        V2 = round((Qact2/A1),3)
        V3 = round((Qact3/A1),3)
        Velocity1=(V1**2)*10000
        Velocity2=(V2**2)*10000
        Velocity3=(V3**2)*10000
        F1 = round(((2*g*d1*Hf1)/(l*(Velocity1))),3)
        F2 = round(((2*g*d1*Hf2)/(l*(Velocity2))),3)
        F3 = round(((2*g*d1*Hf3)/(l*(Velocity3))),3)
        Re1= round(RE(V1),2)
        Re2=round(RE(V2),2)
        Re3=round(RE(V3),2)
        print(json.dumps({"pipe":[{"The coefficient of friction of given pipe is" : str(),"Darcy's friction factor":str(),"F1=":str(F1), "F2=":str(F2),"F3=":str(F3),"Reynold's Number(Re)":str(),"Re1=":str(Re1), "Re2=":str(Re2),"Re3=":str(Re3)}]}))
