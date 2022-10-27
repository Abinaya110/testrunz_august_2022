
import json
import math as m
from turtle import speed
import numpy as np
class FML_svcet:
    def __init__(self, arg):
        self.arg = arg

    def Flow_Through_Orifice_SVCET(self):
        argument = self.arg[0:]
        def VH(h1,h2):
            return((h1-h2)/1000)
        
        def Q(t):
            return((l*b*h*10000)/t)
        
        def WH(H):
            return((H*((Sm-Sw)/Sw)))
        
        def Qth(wh):
            return(a1*a2*(m.sqrt(2*9.81*wh))*10000/(m.sqrt(a1**2 - a2**2)))
        
        def Eff(Qa,Qt):
            return(Qa/Qt)

        d1 = float(argument[1])/1000
        d2 = float(argument[2])/1000
        h = float(argument[3])
        l = float(argument[4])
        b = float(argument[5])
        Sw = float(argument[6])
        Sm = float(argument[7])
        
        H1 =[float(argument[8]),float(argument[16]),float(argument[24])]
        H2 =[float(argument[9]),float(argument[17]),float(argument[25])]
        time = [float(argument[12]),float(argument[20]),float(argument[28])]
        
        a1= (m.pi/4)*(d1**2)
        a2= (m.pi/4)*(d2**2)
        
        Head=list(map(VH, H1,H2))
        Headround=np.round(Head, decimals=2)
        
        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=3)
        
        WaterHead=list(map(WH, Head))
        
        Qthdis=list(map(Qth, WaterHead))
        Qthdisround=np.round(Qthdis, decimals=3)
        
        Effi=list(map(Eff, Qact,Qthdis))
        Efficiency=np.round(Effi, decimals=2)
        
        print(json.dumps({"orifice":[{"The Head difference h " : str(Headround[0]) +", "+ str(Headround[1]) +", "+ str(Headround[2]), "The Water Head H " : str(WaterHead[0]) +", "+ str(WaterHead[1]) +", "+ str(WaterHead[2]), "The Actual discharge Qact " : str(Qactround[0])+ " X 10^-4" +", "+ str(Qactround[1])+ " X 10^-4" +", "+ str(Qactround[2])+ " X 10^-4", "The Theoretical discharge Qth " : str(Qthdisround[0])+ " X 10^-4" +", "+ str(Qthdisround[1]) + " X 10^-4"+", "+ str(Qthdisround[2])+ " X 10^-4","The co-efficient discharge % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])}]}))




    def Flow_Through_Venturimeter_SVCET(self):
        argument = self.arg[0:]
        def VH(h1,h2):
            return(h1-h2)
        
        def Q(t):
            return((A*h*10000)/t)
        
        def WH(H):
            return(((H/1000)*((Sm-Sw)/Sw)))
        
        def Qth(wh):
            return((a1*a2*(m.sqrt(2*9.81*wh)))*10000/(m.sqrt(a1**2 - a2**2)))
        
        def Eff(Qa,Qt):
            return(Qa/Qt)

        h = float(argument[3])
        Sw = float(argument[6])
        Sm = float(argument[7])
        a1 = float(argument[8])
        a2 = float(argument[9])
        A = float(argument[10])

        H1 =[float(argument[11]),float(argument[19]),float(argument[27])]
        H2 =[float(argument[12]),float(argument[20]),float(argument[28])]
        time = [float(argument[15]),float(argument[23]),float(argument[31])]
        
        Head=list(map(VH, H1,H2))
        
        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=2)
        
        WaterHead=list(map(WH, Head))
        
        Qthdis=list(map(Qth, WaterHead))
        Qthdisround=np.round(Qthdis, decimals=2)
        
        Effi=list(map(Eff, Qactround,Qthdisround))
        Efficiency=np.round(Effi, decimals=3)
        
        print(json.dumps({"venturimeter":[{"The Head difference h " : str(Head[0]) +", "+ str(Head[1]) +", "+ str(Head[2]), "The Water Head H " : str(WaterHead[0]) +", "+ str(WaterHead[1]) +", "+ str(WaterHead[2]), "The Actual discharge Qact " : str(Qactround[0])+ " X 10^-4" +", "+ str(Qactround[1]) + " X 10^-4"+", "+ str(Qactround[2])+ " X 10^-4", "The Theoretical discharge Qth " : str(Qthdisround[0])+ " X 10^-4" +", "+ str(Qthdisround[1]) + " X 10^-4"+", "+ str(Qthdisround[2])+ " X 10^-4","The co-efficient discharge % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])}]}))


    def Performance_RP_SVCET(self):
        argument = self.arg[0:]
        
        def Q(t):
            return((A*h*10000)/t)
        
        def Qth(x):
            return(kal/10*x/60)
        
        def sl(Q,Qth):
            return((Qth-Q)/Qth)
        
        def OP(Q,H):
            return((W*Q*H)/1000)
        
        def IP(t):
            return((3100*Nr*0.5)/(c*t))
        
        def Eff(Out,In):
            return((Out/In)/100)

        A = float(argument[1])
        h = float(argument[2])
        Nr = float(argument[3])
        c = float(argument[4])
        W = float(argument[5])
        kal = float(argument[6])
        speed=[float(argument[7]),float(argument[18]),float(argument[29]),float(argument[40])]
        time = [float(argument[10]),float(argument[21]),float(argument[32]),float(argument[43])]
        
        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=3)
        
        Qtheo=list(map(Qth, speed))
        Qtheoround=np.round(Qtheo, decimals=3)
        
        Slip=list(map(sl, Qactround, Qtheoround))
        Slipround=np.round(Slip, decimals=3)
        
        Head = [float(argument[12]),float(argument[23]),float(argument[34]),float(argument[45])]
        timeIn = [float(argument[11]),float(argument[22]),float(argument[33]),float(argument[44])]
        
        Output=list(map(OP, Qactround,Head))
        Outputround=np.round(Output, decimals=3)

        Input=list(map(IP, timeIn))
        Inputround=np.round(Input, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=3)
        
        print(json.dumps({"RP":[{ "The Actual discharge Qact " : str(Qactround[0]) + " X 10^-4" +", "+ str(Qactround[1])+ " X 10^-4" +", "+ str(Qactround[2])+ " X 10^-4"+", "+ str(Qactround[3])+ " X 10^-4","The Theoretical discharge Qth " : str(Qtheoround[0]) + " X 10^-4" +", "+ str(Qtheoround[1]) + " X 10^-4" +", "+ str(Qtheoround[2]) + " X 10^-4"+", "+ str(Qtheoround[3])+ " X 10^-4","The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2])+", "+ str(Outputround[3]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2])+", "+ str(Inputround[3]), "The Slip % " : str(Slipround[0]) +", "+ str(Slipround[1]) +", "+ str(Slipround[2])+", "+ str(Slipround[3]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])+", "+ str(Efficiency[3])}]}))



    def Centrifugal_Pump_SVCET(self):
        argument = self.arg[0:]
        
        def Q(t):
            return((A*h*100)/t)
        
        def OP(Q,H):
            return((W*Q*H)/1000)
        
        def IP(t):
            return((3100*Nr*0.5)/(c*t))
        
        def Eff(Out,In):
            return((Out/In))

        A = float(argument[1])
        h = float(argument[2])
        W = float(argument[3])
        Nr = float(argument[4])
        c = float(argument[5])
        
        time = [float(argument[8]),float(argument[17]),float(argument[26])]
        Head = [float(argument[10]),float(argument[19]),float(argument[28])]
        timeIn = [float(argument[9]),float(argument[18]),float(argument[27])]

        Qact=list(map(Q, timeIn))
        Qactround=np.round(Qact, decimals=3)
        
        Output=list(map(OP, Qactround,Head))
        Outputround=np.round(Output, decimals=3)

        Input=list(map(IP, time))
        Inputround=np.round(Input, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=3)
        
        print(json.dumps({"centrifugal":[{ "The Actual discharge Qact " : str(Qactround[0])+ " X 10^-4" +", "+ str(Qactround[1])+ " X 10^-4" +", "+ str(Qactround[2])+ " X 10^-4","The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])}]}))


    
  
    def Jet_Pump_SVCET(self):
        argument = self.arg[0:]
        
        def Q(t):
            return((A*h*10000)/t)
        
        def OP(Q,H):
            return((9.81*Q*H)/1000)
        
        def IP(t):
            return((X*3600*0.8)/(c*t))
        
        def Eff(Out,In):
            return((Out/In)*100)

        A = float(argument[1])
        h = float(argument[2])
        c = float(argument[3])
        X = float(argument[4])
        
        time = [float(argument[6]),float(argument[14]),float(argument[22]),float(argument[30])]
        Head = [float(argument[11]),float(argument[19]),float(argument[27]),float(argument[35])]
        timeIn = [float(argument[7]),float(argument[15]),float(argument[23]),float(argument[31])]
       
        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=3)
        
        Output=list(map(OP, Qactround, Head))
        Outputround=np.round(Output, decimals=4)

        Input=list(map(IP, timeIn))
        Inputround=np.round(Input, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=2)
        
        print(json.dumps({"jet":[{ "The Actual discharge Qact " : str(Qactround[0])+ " X 10^-4" +", "+ str(Qactround[1])+ " X 10^-4" +", "+ str(Qactround[2])+ " X 10^-4"+", "+ str(Qactround[3])+ " X 10^-4","The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2])+", "+ str(Outputround[3]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2])+", "+ str(Inputround[3]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])+", "+ str(Efficiency[3])}]}))




    def Gear_oil_SVCET(self):
        argument = self.arg[0:]
        
        def Q(t):
            return((A*h*100)/t)
        
        def OP(Q,H):
            return(9.81*Q*H/100)
        
        def IP(t):
            return((X*3600*0.8)/(c*t))
        
        def Eff(Out,In):
            return((Out/In))

        A = float(argument[1])
        h = float(argument[2])
        c = float(argument[3])
        X = float(argument[4])
        
        time = [float(argument[6]),float(argument[14]),float(argument[22]),float(argument[30]),float(argument[38])]
        Head = [float(argument[9]),float(argument[17]),float(argument[25]),float(argument[33]),float(argument[41])]
        timeIN = [float(argument[7]),float(argument[15]),float(argument[23]),float(argument[31]),float(argument[39])]

        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=3)
        
        Output=list(map(OP, Qactround,Head))
        Outputround=np.round(Output, decimals=3)

        Input=list(map(IP, timeIN))
        Inputround=np.round(Input, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=2)
        
        print(json.dumps({"gear":[{ "The Actual discharge Qact " : str(Qactround[0]) + " X 10^-3"+", "+ str(Qactround[1])+ " X 10^-3" +", "+ str(Qactround[2])+ " X 10^-3"+", "+ str(Qactround[3])+ " X 10^-3"+", "+ str(Qactround[4])+ " X 10^-3","The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2])+", "+ str(Outputround[3])+", "+ str(Outputround[4]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2])+", "+ str(Inputround[3])+", "+ str(Inputround[4]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])+", "+ str(Efficiency[3])+", "+ str(Efficiency[4])}]}))




    def Submersible_Pump_SVCET(self):
        argument = self.arg[0:]
        
        def Q(t):
            return((A*h)/t)
        
        def OP(Q):
            return(c*9.81*Q*Head)
        
        def IP(t):
            return((X*3600*0.08)/(c*t))
        
        def Eff(Out,In):
            return((Out/In)*100)

        A = float(argument[1])
        h = float(argument[2])
        c = float(argument[3])
        X = float(argument[4])
        Head =float(argument[5])
        
        time = [float(argument[7]),float(argument[13]),float(argument[19]),float(argument[25]),float(argument[31])]
        timeIN = [float(argument[8]),float(argument[14]),float(argument[20]),float(argument[26]),float(argument[32])]

        Qact=list(map(Q, time))
        Qactround=np.round(Qact, decimals=5)
        
        Output=list(map(OP, Qactround))
        Outputround=np.round(Output, decimals=2)

        Input=list(map(IP, timeIN))
        Inputround=np.round(Input, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=2)
        
        print(json.dumps({"submersible":[{ "The Actual discharge Qact " : str(Qactround[0]) +", "+ str(Qactround[1]) +", "+ str(Qactround[2])+", "+ str(Qactround[3])+", "+ str(Qactround[4]),"The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2])+", "+ str(Outputround[3])+", "+ str(Outputround[4]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2])+", "+ str(Inputround[3])+", "+ str(Inputround[4]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])+", "+ str(Efficiency[3])+", "+ str(Efficiency[4])}]}))



    def Pelton_Wheel_Turbine_SVCET(self):
        argument = self.arg[0:]
        
        def H(p):
            return(((p*10)*G)/100)
        
        def Q(x):
            return((K*(m.sqrt(x))))
        
        def IP(Q):
            return((W*9.81*Q)/100)
        
        def OP(N):
            return(3.14*N*M*d/10000)
        
        def Eff(Out,In):
            return((Out/In)*100)

        K = float(argument[1])
        G = float(argument[2])
        W = float(argument[3])
        M = float(argument[4])
        d = float(argument[5])
        
        pressure = [float(argument[10]),float(argument[19]),float(argument[28]),float(argument[37])]
        speed = [float(argument[7]),float(argument[16]),float(argument[25]),float(argument[34])]

        Head=list(map(H, pressure))
        Headround=np.round(Head, decimals=2)
        
        Qact=list(map(Q, Headround))
        Qactround=np.round(Qact, decimals=2)
        
        Input=list(map(IP, Qactround))
        Inputround=np.round(Input, decimals=2)

        Output=list(map(OP, speed))
        Outputround=np.round(Output, decimals=3)
        
        Effi=list(map(Eff, Outputround,Inputround))
        Efficiency=np.round(Effi, decimals=5)
        
        print(json.dumps({"Pelton":[{"Head, H " : str(Headround[0]) +", "+ str(Headround[1]) +", "+ str(Headround[2])+", "+ str(Headround[3]),"The Actual discharge Qact " : str(Qactround[0]) +", "+ str(Qactround[1]) +", "+ str(Qactround[2])+", "+ str(Qactround[3]),"The Input power " : str(Inputround[0]) +", "+ str(Inputround[1]) +", "+ str(Inputround[2])+", "+ str(Inputround[3]),"The Output power " : str(Outputround[0]) +", "+ str(Outputround[1]) +", "+ str(Outputround[2])+", "+ str(Outputround[3]), "The Efficiency % " : str(Efficiency[0]) +", "+ str(Efficiency[1]) +", "+ str(Efficiency[2])+", "+ str(Efficiency[3])}]}))
