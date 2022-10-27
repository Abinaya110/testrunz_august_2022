import json

class Electronics1:
    def __init__(self, arg):
        self.arg = arg
        
    def FET_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"FET":[{"Result":"The transconductance (gm) of the given FET"}]}))
    def LED_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"LED":[{"Result":"Thus the VI characteristics of LED were plotted."}]}))
    def CE_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"CE":[{"Result":"The input and output characteristics of transistor connectd in CE configuration have been observed and h- paramter calculated."}]}))
    def UJT_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"UJT":[{"Result":"The VI characteristics of the UJT have been plotted:"}]}))
    def SCR_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"SCR":[{"Result":"The VI characteristics of the SCR have been plotted:"}]}))
    def Gate_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Gate":[{"Result":"Thus the AND,OR logic gates has been verified and studied using Diode logic(DL)"}]}))
    def Clipper_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Clipper":[{"Result":"Thus the positive and negative clipper circuit were studied and constructed and its input and output waveforms were drawn"}]}))
    def Clamper_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Clamper":[{"Result":"Thus the positive and negative clamper circuit were studied and constructed and its input and output waveforms were drawn"}]}))
    def Hartley_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Hartley":[{"Result":"Thus the Hartely oscillator was designed and constructed and the output waveform was ploted in graph."}]}))
    def Colpitts_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Colpitts":[{"Result":"Thus the Colpitts oscillator was designed and constructed and the output waveform was ploted in graph."}]}))
    def Zener_acet(self):
        argument = self.arg[0:]
        print(json.dumps({"Zener":[{"Result":"Thus the VI characteristics of zener diode was drawn and its cut in voltage and breakdown voltage were determined:"}]}))