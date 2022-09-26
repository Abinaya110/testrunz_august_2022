import json
from pickletools import float8

class Chem_acet:
    def __init__(self, arg):
        self.arg = arg
        
    def Acetic_acid(self):
        argument = self.arg[0:]
        
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),3)
        Norm2 = round((float(argument[26])*float(argument[27])/float(argument[28])),3)
        Acetic= round((Norm2/10*60),2)
        Percent =round((100*Acetic)/float(argument[16]),2)
        
        print(json.dumps({"ans":[{"Normality of NaOH":str(Norm1),"Normality of oxalic acid in Vinegar":str(Norm2),"Amount of acetic acid present in the given vinegar sample":str(Acetic),"Percentage of acetic acid present in the given vinegar sample":str(Percent)+"%"}]}))
    
    
    def edta(self):
        argument = self.arg[0:]
        
        EDTA = round((float(argument[1])/float(argument[5])),3)
        Hard = round((float(argument[15])*EDTA),3)
        Sample=round((Hard*1000/20),2)
        
        print(json.dumps({"ans":[{"1ml of EDTA":str(EDTA)+"mg of CaCO3","20ml of Hard water":str(Hard)+"mg of CaCO3","1000ml of Sample hard water contains":str(Sample)+"ppm"}]}))
    
    
    def Carbonate(self):
        argument = self.arg[0:]
        
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),3)
        Norm2 = round((Norm1*2*float(argument[18])/float(argument[16])),3)
        Amount= round((Norm2*float(argument[2])*62*100/1000),2)
        Norm3=round((Norm1*(float(argument[19])-2*float(argument[18]))/float(argument[3])),2)
        Amount2 =round((Norm3*84*100/1000),2)
        
        print(json.dumps({"ans":[{"Normality of HCl":str(Norm1),"Normality of Na2CO3":str(Norm2),"Amount of Na2CO3 present in the given solution":str(Amount),"Normality of NaHCO3":str(Norm3)+"%","Amount of NaHCO3 present in the given solution":str(Amount2)}]}))
    
    
    def ferrous(self):
        argument = self.arg[0:]
        
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),3)
        Norm2 = round((float(argument[25])*float(argument[26])/float(argument[27])),2)
        Amount= round((Norm2*55.85*100/1000),2)
        
        print(json.dumps({"ans":[{"Normality of KMnO4":str(Norm1),"Normality of FAS":str(Norm2),"Amount of Ferrous iron present in the given solution":str(Amount)}]}))
    
        
    def mohr(self):
        argument = self.arg[0:]
        
        A= float(argument[21])
        B= float(argument[22])
        Norm1 = round(((A-B)*float(argument[1])/float(argument[20])),2)
        Norm2 = round((Norm1*(A-B)/float(argument[2])),2)
        Amount= round((Norm2*35.45*1000),2)
        
        print(json.dumps({"ans":[{"Normality of AgNO3":str(Norm1),"Normality of Chloride":str(Norm2),"Amount of Chloride present in the given water sample":str(Amount)}]}))
         
         
    def copper(self):
        argument = self.arg[0:]
         
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),4)
        Norm2 = round((float(argument[25])*float(argument[26])/float(argument[27])),3)
        Amount= round((Norm2*63.5*100/1000),4)
        
        print(json.dumps({"ans":[{"Normality of Thio":str(Norm1),"Normality of CuSO4":str(Norm2),"Amount of Copper present in the given solution":str(Amount)}]}))


    def Bleaching_powder(self):
        argument = self.arg[0:]
        
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),4)
        Norm2 = round((float(argument[25])*float(argument[26])/float(argument[27])),3)
        Amount= round((Norm2*35.45*100/1000),4)
        
        print(json.dumps({"ans":[{"Normality of Thio":str(Norm1),"Normality of Chlorine":str(Norm2),"Amount of Chlorine present in the given solution":str(Amount)}]}))
           
                
    def calcium(self):
        argument = self.arg[0:]
        
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),4)
        Norm2 = round((float(argument[25])*float(argument[26])/float(argument[27])),3)
        Amount= round((Norm2*20*100/1000),4)
        
        print(json.dumps({"ans":[{"Normality of KMnO4":str(Norm1),"Normality of Calcium":str(Norm2),"Amount of Calcium present in the given solution":str(Amount)}]}))
           
 
    def oxygen(self):
        argument = self.arg[0:]
         
        Norm1 = round((float(argument[12])*float(argument[13])/float(argument[14])),4)
        Norm2 = round((float(argument[25])*Norm1/float(argument[27])),3)
        Amount= round((Norm2*8*1000),4)
        
        print(json.dumps({"ans":[{"Normality of Thio":str(Norm1),"Normality of Dissolved oxygen":str(Norm2),"Amount of Dissolved Oxygen in the given solution":str(Amount)}]}))
           
    
    def Magnesium(self):
        argument = self.arg[0:]
        Mola1 = round((float(argument[12])*float(argument[13])/float(argument[14])),4)
        Mola2 = round((Mola1*float(argument[26])/float(argument[27])),4)
        Amount= round((Mola2*24*100/1000),4)
        
        print(json.dumps({"ans":[{"Molarity of EDTA":str(Mola1),"Molarity of Magnesium":str(Mola2),"Amount of Magnesium present in the given solution":str(Amount)}]}))
           
   
    
    def Conductometry(self):
        argument = self.arg[0:]
        V1=(float(argument[43])) #20  
        N1 = (float(argument[44])) #  n  
        V2= (float(argument[45]))
        N2= round((V1*N1)/V2,4)
        print(json.dumps({"ans":[{"Amount of lead present in the given":str(N2)}]}))