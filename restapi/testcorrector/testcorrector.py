
class TestCorrector:

    def correct(self, test_found, test_check):
        res = {"correction": [], "score": 0, "max_score": 0}
        for i in range(len(test_found["questions"])):
            number_of_options = len(test_found["questions"][i]["options"])
            if test_check.selection[i] != -1:
                if test_found["questions"][i]["options"][test_check.selection[i]]["is_correct"] == True:
                    res["score"] += 1
                    res["correction"].append(True)
                else:
                    res["score"] -= 1/number_of_options
                    res["correction"].append(False)
            else:
                res["correction"].append(None)
            res["max_score"] += 1
        # Añade el estudiante a la base de datos
        return res