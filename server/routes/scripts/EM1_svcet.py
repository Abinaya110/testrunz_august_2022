import json
import math
class ElecMac1:
    def __init__(self, arg):
        self.arg = arg
    def DCshunt(self):
        argument = self.arg[:]
        def S(X,Y):return(X-Y)
        def Torque(x):return(0.981*x)
        def output(x,y):return((6.28*x*y)/60)
        def Input(x,y):return(x*y)
        def Reg(x,y):return(x/y)*100
       
       
        S1=S(float(argument[9]),float(argument[10]))
        S2=S(float(argument[18]),float(argument[19]))
        S3=S(float(argument[27]),float(argument[28]))
        S4=S(float(argument[36]),float(argument[37]))
        S5=S(float(argument[45]),float(argument[46]))
        S6=S(float(argument[54]),float(argument[55]))

        T1=round(Torque(S1),2)
        T2=round(Torque(S2),2)
        T3=round(Torque(S3),2)
        T4=round(Torque(S4),2)
        T5=round(Torque(S5),2)
        T6=round(Torque(S6),2)
        
        IP1=round(Input(float(argument[6]),float(argument[7])),2)
        IP2=round(Input(float(argument[15]),float(argument[16])),2)
        IP3=round(Input(float(argument[24]),float(argument[25])),2)
        IP4=round(Input(float(argument[33]),float(argument[34])),2)
        IP5=round(Input(float(argument[42]),float(argument[43])),2)
        IP6=round(Input(float(argument[51]),float(argument[52])),2)
        OP1=round(output(float(argument[8]),T1),2)
        OP2=round(output(float(argument[17]),T2),2)
        OP3=round(output(float(argument[26]),T3),2)
        OP4=round(output(float(argument[35]),T4),2)
        OP5=round(output(float(argument[44]),T5),2)
        OP6=round(output(float(argument[53]),T6),2)
        R1=round((Reg(OP1,IP1)),3)
        R2=round((Reg(OP2,IP2)),3)
        R3=round((Reg(OP3,IP3)),3)
        R4=round((Reg(OP4,IP4)),3)
        R5=round((Reg(OP5,IP5)),3)
        R6=round((Reg(OP6,IP6)),3)
        print(json.dumps({"Impact":[{"Thus load test on DC shunt motor is conducted and its efficiency is determined":str(),"Torque(T)":str(T1)+", "+str(T2)+", "+str(T3)+", "+str(T4)+", "+str(T5)+", " +str(T6),"Input Power":str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+", "+str(IP5)+", "+str(IP6),"Output Power":str(OP1)+", "+str(OP2)+", "+str(OP3)+", "+str(OP4)+", "+str(OP5)+", "+str(OP6),"Efficiency(η)":str(R1)+" % ,"+str(R2)+" % ,"+str(R3)+" % ,"+str(R4)+" % ,"+str(R5)+" % "+str(R6)+" %"}]}))

    def DC_SERIES_MOTOR(self):
        argument = self.arg[:]
        def S(X,Y):return(X-Y)
        def Torque(x):return(x*0.981)
        def output(x,y):return((6.28*x*y)/60)
        def Input(x,y):return(x*y)
        def Reg(x,y):return(x/y)*100
        S1=S(float(argument[9]),float(argument[10]))
        S2=S(float(argument[18]),float(argument[19]))
        S3=S(float(argument[27]),float(argument[28]))
        S4=S(float(argument[36]),float(argument[37]))
        S5=S(float(argument[45]),float(argument[46]))
        T1=round(Torque(S1),2)
        T2=round(Torque(S2),2)
        T3=round(Torque(S3),2)
        T4=round(Torque(S4),2)
        T5=round(Torque(S5),2)
        IP1=round(Input(float(argument[6]),float(argument[7])) )
        IP2=round(Input(float(argument[15]),float(argument[16])) )
        IP3=round(Input(float(argument[24]),float(argument[25])) )
        IP4=round(Input(float(argument[33]),float(argument[34])) )
        IP5=round(Input(float(argument[42]),float(argument[43])) )

        OP1=round(output(float(argument[8]),T1) )
        OP2=round(output(float(argument[17]),T2))
        OP3=round(output(float(argument[26]),T3) )
        OP4=round(output(float(argument[35]),T4))
        OP5=round(output(float(argument[44]),T5))
        R1=round((Reg(OP1,IP1)),3)
        R2=round((Reg(OP2,IP2)),3)
        R3=round((Reg(OP3,IP3)),3)
        R4=round((Reg(OP4,IP4)),3)
        R5=round((Reg(OP5,IP5)),3)

        print(json.dumps({"Impact":[{"Thus load test on DC series motor is conducted and its efficiency is determined":str(),"Torque(T)":str(T1)+", "+str(T2)+", "+str(T3)+", "+str(T4)+", "+str(T5),"Input Power":str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+", "+str(IP5),"Output Power":str(OP1)+", "+str(OP2)+", "+str(OP3)+", "+str(OP4)+", "+str(OP5),"Regulation(%)":str(R1)+" % ,"+str(R2)+" % ,"+str(R3)+" % ,"+str(R4)+" % ,"+str(R5)+" %"}]}))
    def DC_COMPOUND_MOTOR(self):
        argument = self.arg[:]
        def S(X,Y):return(Y-X)
        def Torque(x):return(x*0.961)
        def output(x,y):return((6.28*x*y)/60)
        def Input(x,y):return(x*y)
        def Reg(x,y):return(x/y)*100
        S1=S(float(argument[9]),float(argument[10]))
        S2=S(float(argument[18]),float(argument[19]))
        S3=S(float(argument[27]),float(argument[28]))
        S4=S(float(argument[36]),float(argument[37]))
        S5=S(float(argument[45]),float(argument[46]))
        S6=S(float(argument[54]),float(argument[55]))
        S7=S(float(argument[63]),float(argument[64]))
        S8=S(float(argument[72]),float(argument[73]))
        T1=round(Torque(S1),2)
        T2=round(Torque(S2),2)
        T3=round(Torque(S3),2)
        T4=round(Torque(S4),2)
        T5=round(Torque(S5),2)
        T6=round(Torque(S6),2)
        T7=round(Torque(S7),2)
        T8=round(Torque(S8),2)
        IP1=round(Input(float(argument[6]),float(argument[7])),2)
        IP2=round(Input(float(argument[15]),float(argument[16])),2)
        IP3=round(Input(float(argument[24]),float(argument[25])),2)
        IP4=round(Input(float(argument[33]),float(argument[34])),2)
        IP5=round(Input(float(argument[42]),float(argument[43])),2)
        IP6=round(Input(float(argument[51]),float(argument[52])),2)
        IP7=round(Input(float(argument[60]),float(argument[61])),2)
        IP8=round(Input(float(argument[69]),float(argument[70])),2)
        OP1=round(output(float(argument[8]),T1),2)
        OP2=round(output(float(argument[17]),T2),2)
        OP3=round(output(float(argument[26]),T3),2)
        OP4=round(output(float(argument[35]),T4),2)
        OP5=round(output(float(argument[44]),T5),2)
        OP6=round(output(float(argument[53]),T6),2)
        OP7=round(output(float(argument[62]),T7),2)
        OP8=round(output(float(argument[71]),T8),2)
        R1=round((Reg(OP1,IP1)),3)
        R2=round((Reg(OP2,IP2)),3)
        R3=round((Reg(OP3,IP3)),3)
        R4=round((Reg(OP4,IP4)),3)
        R5=round((Reg(OP5,IP5)),3)
        R6=round((Reg(OP6,IP6)),3)
        R7=round((Reg(OP7,IP7)),3)
        R8=round((Reg(OP8,IP8)),3)

        print(json.dumps({"Impact":[{"Thus load test on DC compound motor is conducted and its efficiency is determined":str(),"Torque(T)":str(T1)+", "+str(T2)+", "+str(T3)+", "+str(T4)+", "+str(T5)+", "+str(T6)+", "+str(T7)+", "+str(T8),"Input Power":str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+", "+str(IP5)+", "+str(IP6)+", "+str(IP7)+", "+str(IP8),"Output Power":str(OP1)+", "+str(OP2)+", "+str(OP3)+", "+str(OP4)+", "+str(OP5)+", "+str(OP6)+", "+str(OP7)+", "+str(OP8),"Regulation(%)":str(R1)+" % ,"+str(R2)+" % ,"+str(R3)+" % ,"+str(R4)+" % ,"+str(R5)+" % "+str(R6)+" % ,"+str(R7)+" % "+str(R8)+" %"}]}))
    def SELF(self):
        argument = self.arg[:]
        def PF(x,y,z): return(x/(y*z))
        def CU(x):return((x**2) *scro2)
        RE= float(argument[13])
        def TCU(x):return(x+RE)
        ocsin = round(PF(float(argument[9]),float(argument[7]),float(argument[8])),4)
        occos = math.degrees(math.acos(ocsin))
        ocsine = round((math.sin(math.radians(73.15))),3)
        ocim=round((float(argument[8])*ocsine),3)
        ociw= round((float(argument[8])*ocsin),3)
        ocro =  round((float(argument[7])/ociw),2)
        oxxo =  round((float(argument[7])/ocim),2)
        scro1= round((float(argument[13])) / (float(argument[12])**2),2)
        sczo1 =round( float(argument[11])/(float(argument[12])),3)
        scxo1 = round(math.sqrt((sczo1**2) - (scro1**2)),3)
        scro2=round((0.25* scro1),3)
        sccu1 =round(CU(float(argument[16])),1)
        sccu2=round(CU(float(argument[32])),1)
        sccu3=round(CU(float(argument[48])),1)
        sccu4=round(CU(float(argument[64])),1)
        sccu5=round(CU(float(argument[80])),1)
        TCU1 =round(TCU(sccu1),1)
        TCU2=round(TCU(sccu2),1)
        TCU3=round(TCU(sccu3),1)
        TCU4=round(TCU(sccu4),1)
        TCU5=round(TCU(sccu5),1)
        print(json.dumps({"answer":[{"Thus open circuit characteristics of self excited DC shunt generator are obtained and its critical resistance is determined.":str(),"MODEL CALCULATION":str(),"FROM OPEN CIRCUIT LOAD TEST":str(),
        "Sin Φ :":str(ocsine),"Magnetising current Component(Im):":str(ocim) + " A",
       "Loss current component(Iw):" :str(ociw)+" A","No load parameter(Ro):":str(ocro)+" Ω, ","(Xo):":str(oxxo)+"Ω","FROM SHORT CIRCUIT LOAD TEST:":str(),"No load parameter(Ro1):":str(scro1)+"Ω","Zo1":str(sczo1) +" Ω",
       "Xo1 :":str(scxo1)+" Ω","Copper losses":str(),"CU1 = ":str(sccu1),"CU2 = ":str(sccu2),"CU3 = ":str(sccu3),"CU4 = ":str(sccu4),"CU5 = ":str(sccu5),
       "Total copper loss":str(),"TCU1":str(TCU1),"TCU2":str(TCU2),"TCU3":str(TCU3),"TCU4":str(TCU4),"TCU5":str(TCU5)}]}))
    def trf(self):
        argument = self.arg[:]
        Primary = round(float(argument[22])* 1.25,2)
        Secondary = round(float(argument[23])*1.25,2)
        print(json.dumps({"answer":[{"Thus the parallel operation of two single phase transformation and the load sharing between them were studied.":str(),"Primary fuse rating = ": str(Primary) +" A","Secondary fuse rating = ": str(Secondary)+ " A"}]}))
    def SEPARATELY(self):
        print(json.dumps({"answer":[{"result":"Thus open circuit characteristics of separately excited DC shunt generators are obtained."}]}))
    def Load_Separately(self):
        argument = self.arg[:]
        R1 = float(argument[1])/float(argument[2])
        R2 = float(argument[3])/float(argument[4])
        R3 = float(argument[5])/float(argument[6])
        R4 = float(argument[7])/float(argument[8])
        I1 = float(argument[9])+float(argument[10])
        I2 = float(argument[12])+float(argument[13])
        I3 = float(argument[15])+float(argument[16])
        I4 = float(argument[18])+float(argument[19])
        Rmean=round((R1+R2+R3+R4)/4,2)
        F1 = round(float(argument[11])+(I1*Rmean),2)
        F2 = round(float(argument[14])+(I2*Rmean),2)
        F3 = round(float(argument[17])+(I3*Rmean),2)
        F4 = round(float(argument[20])+(I4*Rmean),2)
        print(json.dumps({"Impact":[{"Thus load characteristics of separately excited DC shunt generator is obtained- Mean value of Ra":str(Rmean), "Actually Generated Voltage_1": str(F1),"Actually Generated Voltage_2": str(F2),"Actually Generated Voltage_3": str(F3), "Actually Generated Voltage_4": str(F4)}]}))
    def Load_Self(self):
        argument = self.arg[:]
        def IA(x,y):return(x+y)
        def IR(X,Y):return(X*Y)
        def Eg(x,y):return(x+y)
        I1=round(IA(float(argument[2]),float(argument[3])),2)
        I2=round(IA(float(argument[5]),float(argument[6])),2)
        I3=round(IA(float(argument[8]),float(argument[9])),2)
        I4=round(IA(float(argument[11]),float(argument[12])),2)
        IR1=round(IR(float(argument[1]),I1),2)
        IR2=round(IR(float(argument[1]),I2),2)
        IR3=round(IR(float(argument[1]),I3),2)
        IR4=round(IR(float(argument[1]),I4),2)
        eg1=round(Eg(float(argument[4]),IR1),2)
        eg2=round(Eg(float(argument[7]),IR2),2)
        eg3=round(Eg(float(argument[10]),IR3),2)
        eg4=round(Eg(float(argument[13]),IR4),2)
        print(json.dumps({"Impact":[{"Thus load characteristics of separately excited DC shunt generator is obtained":" ","Armature current(Ia)":str(I1)+", "+str(I2)+", "+str(I3)+", "+str(I4)+" (Amps) ","Generated emf in Volts (Eg)": str(eg1)+", "+str(eg2)+", "+str(eg3)+", "+str(eg4)}]}))
    def Hopkin(self):
        argument = self.arg[:]
        def Ra(x,y):return(x/y)
        def Cl(x,y,z):return((x+y)**2)*z
        def R(x,y,z):return(x/((y+z)/2))
        def Fl(x,y):return(x*y)
        def Sl(a,b,c,d):return(((a*b)-c+d)/2)
        def Tl(a,b,c,d):return(a+(b*c)+d)
        def Input(a,b,c,d):return((a+b+c)*d)
        def Eff(x,y):return(((y-x)/x)*100)
        def copper(x,y):return((x**2)*y)
        Ra1=Ra(float(argument[22]),float(argument[23]))
        Ra2=Ra(float(argument[24]),float(argument[25]))
        Ra3=Ra(float(argument[26]),float(argument[27]))
        Ra4=Ra(float(argument[28]),float(argument[29]))
        Ra5=Ra(float(argument[30]),float(argument[31]))
        RA=round((Ra1+Ra2+Ra3+Ra4+Ra5)/5,2)
        R1=round(R(float(argument[1]),float(argument[2]),float(argument[3])),2)
        R2=round(R(float(argument[5]),float(argument[6]),float(argument[7])),2)
        R3=round(R(float(argument[9]),float(argument[10]),float(argument[11])),2)
        r1=round((float(argument[3])**2)*R1)
        r2=round((float(argument[7])**2)*R2)
        r3=round((float(argument[11])**2)*R3)
        CL1=round(Cl(float(argument[2]),float(argument[3]),R1),2)
        CL2=round(Cl(float(argument[6]),float(argument[7]),R2),2)
        CL3=round(Cl(float(argument[10]),float(argument[11]),R3),2)
        Fl1=round(Fl(float(argument[1]),float(argument[4])),2)
        Fl2=round(Fl(float(argument[5]),float(argument[8])),2)
        Fl3=round(Fl(float(argument[9]),float(argument[12])),2)
        Sl1=round(Sl(float(argument[1]),float(argument[2]),CL1,r1))
        Sl2=round(Sl(float(argument[5]),float(argument[6]),CL2,r2))
        Sl3=round(Sl(float(argument[9]),float(argument[10]),CL3,r3))
        I1=round(Input(float(argument[2]),float(argument[3]),float(argument[4]),float(argument[1])),2)
        I2=round(Input(float(argument[6]),float(argument[7]),float(argument[8]),float(argument[5])),2)
        I3=round(Input(float(argument[10]),float(argument[11]),float(argument[12]),float(argument[9])),2)
        TL1=round(Tl(CL1,float(argument[1]),float(argument[4]),Sl1),2)
        TL2=round(Tl(CL2,float(argument[5]),float(argument[8]),Sl2),2)
        TL3=round(Tl(CL3,float(argument[9]),float(argument[12]),Sl3),2)
        E1=round(Eff(I1,TL1),2)
        E2=round(Eff(I2,TL2),2)
        E3=round(Eff(I3,TL3),2)
        Output1=round(Fl(float(argument[13]),float(argument[15])),2)
        Output2=round(Fl(float(argument[16]),float(argument[18])),2)
        Output3=round(Fl(float(argument[19]),float(argument[21])),2)
        Copper1=round(copper(float(argument[15]),RA),2)
        Copper2=round(copper(float(argument[18]),RA),2)
        Copper3=round(copper(float(argument[21]),RA),2)
        Stray1=round(((((float(argument[13])*float(argument[14]))-((float(argument[14])+float(argument[15]))**2))*RA)+Copper1)/2,2)
        Stray2=round(((((float(argument[16])*float(argument[17]))-((float(argument[17])+float(argument[18]))**2))*RA)+Copper2)/2,2)
        Stray3=round(((((float(argument[19])*float(argument[20]))-((float(argument[20])+float(argument[21]))**2))*RA)+Copper3)/2,2)
        Total1=round((Copper1+Output1+Stray1),2)
        Total2=round((Copper2+Output2+Stray2),2)
        Total3=round((Copper3+Output3+Stray3),2)
        Efficiency1=round((Output1/(Output1+Total1))*100,2)
        Efficiency2=round((Output2/(Output2+Total2))*100,2)
        Efficiency3=round((Output3/(Output3+Total3))*100,2)
        print(json.dumps({"answer":[{"The Hopkinson’s test on a pair of identical DC machines to pre-determine the efficiency of the machine as generator and as motor":"For Motor" ,"Armature Resistance(Ra)" :str(RA),"Copper Loss:":str(CL1)+", "+str(CL2)+", "+str(CL3)+", ","Fluid loss":str(Fl1)+", "+str(Fl2)+", "+str(Fl3),"Stray loss":str(Sl1)+", "+str(Sl2)+", "+str(Sl3),"Input Power":str(I1)+", "+str(I2)+", "+str(I3),"Total loss":str(TL1)+", "+str(TL2)+", "+str(TL3),"Efficiency":str(E1)+"% ,"+str(E2)+"% ,"+str(E3)+"% ",
        "For generator":str(),"Copper losses":str(Copper1)+", "+str(Copper2)+", "+str(Copper3),"Output Power":str(Output1)+", "+str(Output2)+", "+str(Output3),"Stray losses":str(Stray1)+", "+str(Stray2)+", "+str(Stray3),"Total losses":str(Total1)+", "+str(Total2)+", "+str(Total3),"Efficiency ":str(Efficiency1)+"% "+str(Efficiency2)+"% "+str(Efficiency3)+"%"}]}))        
    def Speed(self):
        print(json.dumps({"answer":[{"result":"Thus the speed control of DC Shunt Motor is obtained using Armature and Field control methods"}]}))
    def OC(self):
        print(json.dumps({"answer":[{"result":"Thus the efficiency and regulation of a transformer is predetermined by conducting open circuit test and short circuit test and the equivalent circuit is drawn."}]}))
    def OCDC(self):
        print(json.dumps({"answer":[{"result":"Thus the above experiment is simulated"}]}))
    def occ(self):
        argument = self.arg[:]
        def Ra(x,y):return(y/x)
        def Eg(x,y):return(x+(y*AR))
        def AC(x,y):return(x+y)
        Ra1 = Ra(float(argument[67]),float(argument[68]))
        Ra2=Ra(float(argument[70]),float(argument[71]))
        Ra3=Ra(float(argument[73]),float(argument[74]))
        Ra4=Ra(float(argument[76]),float(argument[77]))
        Ra5 =Ra (float(argument[79]),float(argument[80]))
        AR = round((Ra1+Ra2+Ra3+Ra4+Ra5)/5,2)

        FR1=round((float(argument[85])*float(argument[83]))/float(argument[84]))
        FR2=round((float(argument[88])*float(argument[83]))/float(argument[87]))
        FR3=round((float(argument[91])*float(argument[83]))/float(argument[90]))
        FR4=round((float(argument[94])*float(argument[83]))/float(argument[93]))
        FR5=round((float(argument[97])*float(argument[83]))/float(argument[96]))
        FR = round((FR1+FR2+FR3+FR4+FR5)/5,2)

        AC1= AC(float(argument[27]),float(argument[29]))
        AC2= AC(float(argument[32]),float(argument[34]))
        AC3= AC(float(argument[37]),float(argument[39]))
        AC4= AC(float(argument[42]),float(argument[44]))
        AC5= AC(float(argument[47]),float(argument[49]))
        AC6=AC(float(argument[52]),float(argument[54]) )
        AC7= AC(float(argument[57]),float(argument[59]))
        AC8=AC(float(argument[62]),float(argument[64]))
        
        EG1=round( Eg((float(argument[28])),AC1),2)
        EG2=round(Eg((float(argument[33])),AC2),2)
        EG3=round(Eg((float(argument[38])),AC3),2)
        EG4=round(Eg((float(argument[43])),AC4),2)
        EG5=round(Eg((float(argument[48])),AC5),2)
        EG6=round(Eg((float(argument[53])),AC6),2)
        EG7=round(Eg((float(argument[58])),AC7),2)
        EG8=round(Eg((float(argument[63])),AC8),2)

        print(json.dumps({"answer":[{"Average Armature Resistance":str(AR)+" Ω","Average Field Resistance":str(FR)
       , "Induced Emf(V)":str(EG1)+" V, "+str(EG2)+" V, "+str(EG3)+" V, "+str(EG4)+" V, "+str(EG5)+" V, "+str(EG6)+" V, "+str(EG7)+" V, "+str(EG8)+" V"}]}))
    def DCSeries(self):
        argument = self.arg[:]  
        def Ra(x,y):return(y/x)
        Ra1 = Ra(float(argument[41]),float(argument[42]))
        Ra2=Ra(float(argument[44]),float(argument[45]))
        Ra3=Ra(float(argument[47]),float(argument[48]))
        Ra4=Ra(float(argument[50]),float(argument[51]))
        Ra5 =Ra (float(argument[53]),float(argument[54]))
        RA = round((Ra1+Ra2+Ra3+Ra4+Ra5)/5,2)

        Rse1=Ra(float(argument[57]),float(argument[58]))
        Rse2=Ra(float(argument[60]),float(argument[61])) 
        Rse3=Ra(float(argument[63]),float(argument[64]))
        Rse4=Ra(float(argument[66]),float(argument[67]))
        Rse5 =Ra(float(argument[69]),float(argument[70]))
        Rse6=Ra(float(argument[72]),float(argument[73]))
        RSE = round((Rse1+Rse2+Rse3+Rse4+Rse5+Rse6)/6,2)

        Ra =  RA+RSE
        
        r1= round(float(argument[11])*Ra,3)
        r2= round(float(argument[16])* Ra,3)
        r3= round(float(argument[21])* Ra,3)
        r4=round(float(argument[26])* Ra,3)
        r5= round(float(argument[31])* Ra,3)
        r6= round(float(argument[36])* Ra,3)

        Eg1 = r1+ float(argument[12])
        Eg2 = r2+ float(argument[17])
        Eg3= r3 + float(argument[22])
        Eg4= r4+ float(argument[27])
        Eg5= r5+ float(argument[32])
        Eg6= r6+ float(argument[37])

        print(json.dumps({"answer":[{"Average Armature Resistance":str(Ra)+" Ω", "Average series Resistance":str(RSE)+" Ω ","Armature Voltage (Va)":str(),"Va1":str(r1)+" , ","Va2":str(r2)+" , ","Va3":str(r3)+" , ","Va4":str(r4)+" , ","Va5":str(r5)
        +" , ","Va6":str(r6),"Generated emf (Eg)":str(),"Eg1":str(Eg1),"Eg2":str(Eg2),"Eg3":str(Eg3),"Eg4":str(Eg4),"Eg5":str(Eg5),"Eg6":str(Eg6)}]}))
    def Three(self):
        argument = self.arg[:]
        def IP(x,y):return(x+y)
        def w1(x):return(x*MF1)
        def w2(x):return(x*MF2)
        def OP(x,y):return(1.732*x*y)
        def R(x):return(((float(argument[15])-x)/float(argument[15]))*100)
        MF1=(float(argument[7]))
        MF2=float(argument[8])

        w11= w1(float(argument[11]))
        w21 = w2(float(argument[13]))
        w12= w1(float(argument[23]))
        w22= w2(float(argument[25]))
        w13 = w1(float(argument[35]))
        w23=w2(float(argument[37]))
        w14= w1(float(argument[47]))
        w24= w2(float(argument[49]))
        w15= w1(float(argument[59]))
        w25= w2(float(argument[61]))

        IP1= round(IP(w11,w21))
        IP2= round(IP(w12,w22))
        IP3= round(IP(w13,w23))
        IP4= round(IP(w14,w24))
        IP5= round(IP(w15,w25))

        OP1= round(OP(float(argument[15]),float(argument[16])),2)
        OP2= round(OP(float(argument[27]),float(argument[28])),2)
        OP3= round(OP(float(argument[39]),float(argument[40])),2)
        OP4= round(OP(float(argument[51]),float(argument[52])),2)
        OP5= round(OP(float(argument[63]),float(argument[64])),2)

        # E1=round((OP1/IP1),2)
        E2=round((OP2/IP2)*100,2)
        E3=round((OP3/IP3)*100,2)
        E4=round((OP4/IP4)*100,2)
        E5=round((OP5/IP5)*100,2)

        R1= round(R(float(argument[27])),2)
        R2= round(R(float(argument[39])),2)
        R3= round(R(float(argument[51])),2)
        R4= round(R(float(argument[63])),2)

        print(json.dumps({"answer":[{"Input power(W)":str(),"W ": str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+", "+str(IP5)
        ,"Output Power(W)": str(),"W":str(OP1)+", "+str(OP2)+", "+str(OP3)+", "+str(OP4)+", "+str(OP5),
         "Effiency(%)":str(E2)+", "+str(E3)+", "+str(E4)+", "+str(E5),"Regulation":str(R1)+", "+str(R2)+", "+str(R3)+", "+str(R4)}]}))
    def Singlephasetrf(self):
        argument = self.arg[:]
        IP1 = 0            #float(argument[7])*float(argument[10])
        IP2 = round(float(argument[7])*float(argument[20]))
        IP3 = round(float(argument[7])*float(argument[30]))
        IP4 = round(float(argument[7])*float(argument[40]))
        IP5 = round(float(argument[7])*float(argument[50]))
        IP6= round(float(argument[7])*float(argument[60]))
        IP7= round(float(argument[7])*float(argument[70]))

        OP1 = 0               #float(argument[12])*float(argument[13])
        OP2 = round(float(argument[22])*float(argument[23]))
        OP3 =round (float(argument[32])*float(argument[33]))
        OP4 = round(float(argument[42])*float(argument[43]))
        OP5 =round (float(argument[52])*float(argument[53]))
        OP6= round(float(argument[62])*float(argument[63]))
        OP7=round (float(argument[72])*float(argument[73]))
        E1 =  0                     # (OP1/IP1)*100
        E2 = round((OP2/IP2)*100)
        E3 = round((OP3/IP3)*100)
        E4 = round((OP4/IP4)*100)
        E5 = round((OP5/IP5)*100)
        E6= round((OP6/IP6)*100)
        E7=   round((OP7/IP7)*100)

    
        R2 = round((((float(argument[6])-float(argument[13]))/float(argument[6]))*10),2)
        R3 = round((((float(argument[6])-float(argument[23]))/float(argument[6]))*10),2)
        R4 = round((((float(argument[6])-float(argument[33]))/float(argument[6]))*10),2)
        R5 = round((((float(argument[6])-float(argument[43]))/float(argument[6]))*10),2)
        R6= round((((float(argument[6])-float(argument[53]))/float(argument[6]))*10),2)
        R7= round((((float(argument[6])-float(argument[63]))/float(argument[6]))*10),2)
        R8= round((((float(argument[6])-float(argument[73]))/float(argument[6]))*10),2)
        print(json.dumps({"answer":[{"result":"Thus the load test on single phase transformer was performly and the respective graph were plotted ].","Input Power(W)":str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+", "+str(IP5)+", "+str(IP6)+", "+str(IP7),"Output Power":str(OP1)+", "+str(OP2)+", "+str(OP3)+", "+str(OP4)+", "+str(OP5)+", "+str(OP6)+", "+str(OP7),"Efficiency":str(E1)+" % ,"+str(E2)+" % ,"+str(E3)+" % ,"+str(E5)+" % ,"+str(E6)+" % ,"+str(E7)+"%",
        "Regulation ":str(R2)+" %,"+str(R3)+" %,"+str(R4)+" %,"+str(R5)+" %,"+str(R6)+" %, "+str(R7)+" %, "+str(R8)+" %"}]}))
    def SWINBURNE(self):
        argument = self.arg[:]
        Ia= round((float(argument[3])-float(argument[4])),2)
        def R(x,y):return(x/y)
        def IP(x,y):return(x*y)
        def OP(x,y):return(x-y)
        def IR(x):return(x**2)*RA
        def TL(x):return(Wc+x)
        def E(x,y):return(x/y)*100
        def ia(x,y):return(x+y)
        
        R1=(R(float(argument[92]),float(argument[93])))
        R2=R(float(argument[95]),float(argument[96]))
        R3=R(float(argument[98]),float(argument[99]))
        R4=R(float(argument[101]),float(argument[102]))
        RA=round((R1+R2+R3+R4)/4,2)
        VIO=IP(float(argument[6]),float(argument[7]))
        ioif=(float(argument[9])**2)
        Wc= round(VIO-ioif*RA,2)

# copper loss-motor
        IR1=round(IR(float(argument[14])),2)
        IR2=round(IR(float(argument[22])),2)
        IR3=round(IR(float(argument[30])),2)
        IR4=round(IR(float(argument[38])),2)
        IR5=round(IR(float(argument[46])),2)
#total loss -m
        TL1=round(TL(IR1),2)
        TL2=round(TL(IR2),2)
        TL3=round(TL(IR3),2)
        TL4=round(TL(IR4),2)
        TL5=round(TL(IR5),2)

        

        IP1=round(IP(float(argument[12]),float(argument[13])),2)
        IP2=round(IP(float(argument[20]),float(argument[21])),2)
        IP3=round(IP(float(argument[28]),float(argument[29])),2)
        IP4=round(IP(float(argument[36]),float(argument[37])),2)
        IP5=round(IP(float(argument[44]),float(argument[45])),2)

        OP1=round(OP(IP1,TL1),2)
        OP2=round(OP(IP2,TL2),2)
        OP3=round(OP(IP3,TL3),2)
        OP4=round(OP(IP4, TL4),2)
        OP5=round(OP(IP5,TL5),2)

        E1=round(E(OP1,IP1),2)
        E2=round(E(OP2,IP2),2)
        E3=round(E(OP3,IP3),2)
        E4=round(E(OP4,IP4),2)
        E5=round(E(OP5,IP5),2)

# copperloss-generator
    

        ir1=round(IR(float(argument[54])),2)
        ir2=round(IR(float(argument[62])),2)
        ir3=round(IR(float(argument[70])),2)
        ir4=round(IR(float(argument[78])),2)
        ir5=round(IR(float(argument[86])),2)

        tl1=round(TL(ir1),2)
        tl2=round(TL(ir2),2)
        tl3=round(TL(ir3),2)
        tl4=round(TL(ir4),2)
        tl5=round(TL(ir5),2)

        

        op1=round(IP(float(argument[52]),float(argument[53])),2)
        op2=round(IP(float(argument[60]),float(argument[61])),2)
        op3=round(IP(float(argument[68]),float(argument[69])),2)
        op4=round(IP(float(argument[76]),float(argument[77])),2)
        op5=round(IP(float(argument[84]),float(argument[85])),2)
       

        ip1=round(ia(op1,tl1),2)
        ip2=round(ia(op2,tl2),2)
        ip3=round(ia(op3,tl3),2)
        ip4=round(ia(op4,tl4),2)
        ip5=round(ia(op5,tl5),2)


        e1=round(E(op1,ip1),2)
        e2=round(E(op2,ip2),2)
        e3=round(E(op3,ip3),2)
        e4=round(E(op4,ip4),2)
        e5=round(E(op5,ip5),2)
        print(json.dumps({"answer":[{"To predetermine the efficiency of the given DC shunt machine while running as a motor and as a generator  by conducting Swinburne’s test.":str(),"Armature Resistance(Ra)":str(RA),"Constant load":str(Wc)+ " N ","MOTOR":str(),"Copper Losses":str(IR1)+", "+str(IR2)+" , "+str(IR3)+" , "+str(IR4)+" , ",
        "Total losses":str(TL1)+" , "+str(TL2)+" , "+str(TL3)+" , "+str(TL4)+" , "+str(TL5),"Output power":str(OP1)+" , "+str(OP2)+" , "+str(OP3)+" , "+str(OP4)+" , "+str(OP5),
        "Input power": str(IP1)+", "+str(IP2)+", "+str(IP3)+", "+str(IP4)+" , "+str(IP5),
        "Efficiency":str(E1)+"%, "+str(E2)+"%, "+str(E3)+"%, "+str(E4)+"%, "+str(E5)+"% ",
        "GENERATOR":str(),"Copper losses":str(ir1)+", "+str(ir2)+", "+str(ir3)+", "+str(ir4)+", "+str(ir5),"Total_Loss":str(tl1)+", "+str(tl2)+", "+str(tl3)+", "+str(tl4)+", "+str(tl5),"Input Power":str(ip1)+", "+str(ip2)+", "+str(ip3)+"," +str(ip4)+", "+str(ip5),"Output_power":str(op1)+", "+str(op2)+", "+str(op3)+", "+str(op4)+", "+str(op5),"Efficiency ":str(e1)+"% , "+str(e2)+"% , "+str(e3)+"% , "+str(e4)+"% ,"+str(e5)+"%"
        }]}))
    
    


        

    












        




        





