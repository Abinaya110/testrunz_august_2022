import json
import math
class Elec1:
    def __init__(self, arg):
        self.arg = arg
    def CB_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Then input and output characteristics of the bipolar junction transistor in Common Base conjunction is obtained."}]}))
    def CE_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Then input and output characteristics of the bipolar junction transistor in Common Emitter conjunction is obtained."}]}))
    def FET_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"These the drain and transfer characteristics of field effect transistor is obtained and the parameter are determined."}]}))
    def UJT_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus the characteristic of uni-junction transistor was determined and interinsic stand off ratio are obtained"}]}))
    def SCR_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus VI-characteristics of SCR is plotted."}]})) 
    def Triac_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus VI-characteristics of TRIAC was obtained and graph was drawn."}]})) 
    def Clamper_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus output performance for the clipper and clamper circuit is verified"}]})) 
    def Full_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus the full wave bridge rectifiers is deisgned woth and without capacitor filter and the cooresponding DC output voltages and the ripple factor are measured and verified with the theoritucal values."}]})) 
    def Biasing_SVCET(self):
        argument = self.arg[:] 
        print(json.dumps({"answer":[{"Result":"Thus the various biasing circuits has been designed and tested successfully."}]})) 



