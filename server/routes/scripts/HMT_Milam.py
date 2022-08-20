import json
import math as m
import numpy as np



class HMT_Milam:
    def __init__(self, arg):
        self.arg = arg

    def morse(self):
        argument = self.arg[0:]
        def find_torque(w):
            return (w*0.356*9.81)
        def find_breakpow(n,t):
            return(2*m.pi*n*t/(60*1000))


        dynometerload=[float(argument[1]),float(argument[4]),float(argument[7]),float(argument[10]),float(argument[13])]
        power_output=[float(argument[2]),float(argument[5]),float(argument[8]),float(argument[11]),float(argument[14])]
        speed=[float(argument[3]),float(argument[6]),float(argument[9]),float(argument[12]),float(argument[15])]



        
        torque= list(map(find_torque, dynometerload))
        breakpow1= list(map(find_breakpow, speed,torque))
        indicated_power1=np.subtract(power_output,breakpow1)
        indicated_power= sum(indicated_power1)



        print(json.dumps({"Centrifugal":[{"hello" : str(breakpow1[1]),"Hello2":str(indicated_power1[1]),"Hello3":"helo3","Hello4":"helo4" }]}))


    def heat_balance(self):
        argument = self.arg[0:]
        def total_fuel_consumption(t):
            return (10*0.82/(t*1000))
        def heatloss_breakpowe(t):
            return(2*m.pi*1500*t/(60*1000))
        def massflowrate(t):
            return(5/t)
        def calculate_ha(h):
            return(h*1000/1.13)
        def heat_carriedby_cooling_water(m,t2,t1):
            return(m*4.2*(t2-t1))

        load=[float(argument[4]),float(argument[17]),float(argument[30]),float(argument[43]),float(argument[56])]
        temp1=[float(argument[8]),float(argument[21]),float(argument[34]),float(argument[47]),float(argument[60])]
        temp2=[float(argument[9]),float(argument[22]),float(argument[35]),float(argument[48]),float(argument[61])]
        w=[float(argument[5]),float(argument[18]),float(argument[31]),float(argument[44]),float(argument[57])]
        s=[float(argument[6]),float(argument[19]),float(argument[32]),float(argument[45]),float(argument[58])]
        time_taken_tf=[float(argument[11]),float(argument[24]),float(argument[37]),float(argument[50]),float(argument[63])]
        time_taken_tw=[float(argument[12]),float(argument[25]),float(argument[38]),float(argument[51]),float(argument[64])]
        h1=[float(argument[13]),float(argument[26]),float(argument[39]),float(argument[52]),float(argument[65])]
        h2=[float(argument[14]),float(argument[27]),float(argument[40]),float(argument[53]),float(argument[66])]
        hw=list((np.array(h1)-np.array(h2))*0.01)
        ha=list(map(calculate_ha, hw))

        w_s=list(np.array(w)-np.array(s))
        tfc=list(map(total_fuel_consumption, time_taken_tf))
        Qbp=list(map(heatloss_breakpowe, tfc))
        mw=list(map(massflowrate, time_taken_tw))
        heat_carried_by_cooling_water=list(map(heat_carriedby_cooling_water,mw,temp2,temp1))


       


        print(json.dumps({"Centrifugal":[{"hello" : str(breakpow1[1]),"Hello2":str(indicated_power1[1]),"Hello3":"helo3","Hello4":"helo4" }]}))


    def hot_plate_Mailam(self):
        argument = self.arg[0:]
        v=float(argument[1])
        a=float(argument[2])
        t1=float(argument[3])
        t2=float(argument[4])
        t3=float(argument[6])
        t4=float(argument[7])
        t5=float(argument[9])
        t6=float(argument[10])
        q=v*a
        tavg1=(t1+t2)/2
        tavg2=(t3+t4)/2
        area=(m.pi*(0.2)**2)/4
        k1=(q*0.0025)/(area*(tavg1-t5))
        k2=(q*0.0025)/(area*(tavg2-t6))
        k=round((k1+k2)/2, 2)
        print(json.dumps({"Centrifugal":[{"Result" : "The thermal conductivity of the specimen is found to be "+str(k)+" W/mK" }]}))



    def Lagged_Pipe_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[1])
        t2=float(argument[2])
        t3=float(argument[3])
        t4=float(argument[5])
        t5=float(argument[6])
        t6=float(argument[7])
        t7=float(argument[9])
        t8=float(argument[10])
        v=float(argument[12])
        a=float(argument[13])

        tavg1=(t1+t2+t3)/3
        tavg2=(t4+t5+t6)/3
        tavg3=(t7+t8)/2
        r1= 0.01  #from dia of heater rod 20mm  => radius = 10 mm => 0.01m
        r2= 0.02  #from dia of lagging rod 40mm  => radius = 20 mm => 0.02m 
        r3= 0.04  #from dia of saw dust 80mm  => radius = 40 mm => 0.04m
        length= 0.5 #from length 500mm=>0.5m
        q=v*a
        k1=(m.log(r2/r1)*q)/(2*m.pi*length*(tavg2))
        k2=(m.log(r3/r2)*q)/(2*m.pi*length*(tavg3))
        k1ans=round(k1,2)
        k2ans=round(k2,2)
        print(json.dumps({"Centrifugal":[{"The thermal conductivity of the Asbestos is ":str(k1ans)+" W/mK," ,"The thermal conductivity of the saw dust is ":str(k2ans)+" W/mK"}]}))




    def Free_Convection_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[3])
        t2=float(argument[4])
        t3=float(argument[5])
        t4=float(argument[6])
        t5=float(argument[7])
        t6=float(argument[8])
        
        v=float(argument[1])
        a=float(argument[2])

        area =m.pi*0.04*0.5
        delt = ((t2+t3+t4+t5)/4)  - ((t1+t6)/2)
        h = v*a/(area*delt)
        hans=round(h,2)
        print(json.dumps({"Centrifugal":[{"The heat transfer cofficient is found to be ":str(hans)+" W/m^2K"}]}))


    def Forced_convection_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[5])
        t2=float(argument[6])
        t3=float(argument[7])
        t4=float(argument[8])
        t5=float(argument[9])
        t6=float(argument[10])

        
        v=float(argument[1])
        a=float(argument[2])
        h1=float(argument[3])
        h2=float(argument[4])
        ts=(t2+t3+t4+t5)/4
        td=(t6-t1)/2
        q=v*a
        area =0.063 #refered from record
    
        delt = ((t2+t3+t4+t5)/4)  - ((t1+t6)/2)
        h = v*a/(area*delt)
        hans=round(h,2)
        print(json.dumps({"Centrifugal":[{"The heat transfer cofficient is found to be ":str(hans)+" W/m^2K"}]}))


    def Stefan_Boltzman_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[1])
        t2=float(argument[2])
        t3=float(argument[3])
        t4=float(argument[5])
        time=float(argument[6])
        td=float(argument[7])
        th=(t1+t2+t3)/3
        mass=0.005
        cp=381
        detdx=0.31
        q= mass*cp*detdx
        a=(0.02**2)/4
        ans=q/(a*(th**4 - t4**4))



        print(json.dumps({"Centrifugal":[{"Stefan Boltzman constant is founf to be ":str(ans)+" W/m^2K"}]}))

    def Emissivity_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[1])
        t2=float(argument[2])
        t3=float(argument[3])
        t4=float(argument[5])
        t5=float(argument[6])
        t6=float(argument[7])
        t7=float(argument[8])
        tp=((t1+t2+t3)/3)+273
        tb=((t5+t6+t7)/3)+273
        tc=t4+273
        em=(tb**4 - tc**4)  /  (tp**4 - tc**4)
        print(json.dumps({"Centrifugal":[{"Emisivity of the specimen is found to be ":str(em)+" W/m^2K"}]}))

    def Counter_Flow_Mailam(self):
        argument = self.arg[0:]
        thip=float(argument[5])
        thop=float(argument[6])
        tcip=float(argument[3])
        tcop=float(argument[4])
        timehp=float(argument[1])
        timecp=float(argument[2])

        thic=float(argument[11])
        thoc=float(argument[12])
        tcic=float(argument[9])
        tcoc=float(argument[10])
        timehc=float(argument[7])
        timecc=float(argument[8])
        lmtdp=((thip-tcip)-(thop-tcop)) / m.log((thip-tcip)/(thop-tcop))
        # lmtdc=((thic-tcic)-(thoc-tcoc)) / m.log((thic-tcic)/(thoc-tcoc))

        mhp=timehp*0.0001
        # mcp=timecp*0.0001
        mhc=timehc*0.0001
        # mcc=timecc*0.0001
        a=0.06125

        qhp= mhp*4.187*(thip-thop)
        # qhc= mhc*4.187*(thic-thoc)

        up= qhp /(a*lmtdp)
        # uc= qhc /(a*lmtdc)

        
        print(json.dumps({"Centrifugal":[{"Overall heat coefficient in parallel flow ":str(up)+" W/m^2K","Overall heat coefficient in counter flow ":str(up)+" W/m^2K"}]}))


    def Insulating_Powder_Mailam(self):
        argument = self.arg[0:]
        t1=float(argument[1])
        t2=float(argument[2])
        t3=float(argument[3])
        t4=float(argument[4])
        t5=float(argument[5])
        t6=float(argument[6])
        t7=float(argument[7])
        t8=float(argument[8])
        t9=float(argument[9])
        t10=float(argument[10])
        v=float(argument[11])
        a=float(argument[12])

        ti = (t1+t2+t3+t4)/4
        to = (t5+t6+t7+t8+t9+t10)/6
        ri = 0.05
        ro = 0.1
        q=v*a
        k = (q * (ro-ri))   /  (4*m.pi*ri*ro*(ti-to))
        kans=round(k,2)
        print(json.dumps({"Centrifugal":[{"The thermal conductivity of the given insulating powder is ":str(kans)+" W/mK"}]}))




























