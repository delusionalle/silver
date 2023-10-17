import joblib

class AIModel:

    def __init__(self, id, name, model_path) -> None:
        self.id = id
        self.name = name
        self.model_path = model_path
    
    def load_model(self):
        return joblib.load(self.model_path)
    