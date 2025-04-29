from sentence_transformers import SentenceTransformer
import openpyxl

# Load the workbook
workbook = openpyxl.load_workbook('2024-25CTEArticulations.xlsx')

# Get the sheet by name or index
sheet = workbook['Sheet1']  # Replace 'Sheet1' with your sheet name
# sheet = workbook.active # To get the active sheet

data_list = []
for row in sheet.iter_rows(values_only=True):
    data_list.append(list(row))

# 1. Load a pretrained Sentence Transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")
filename = "output.txt"
f = open(filename, "a")


test = 0
count = [0,0,0]
averageValue = [0, 0, 0]
for row in data_list[2:]:
    sentences = [
    row[0],
    row[1],
    row[2],
    ]

    
    embeddings = model.encode(sentences)
    print(embeddings.shape)
    # [3, 384]

    # 3. Calculate the embedding similarities
    similarities = model.similarity(embeddings, embeddings)
    print(similarities)
    for x in range (0, 3): 
        new_item = similarities[x]
        for y in range (0, 3):
            if (y != x):
               count[y] = count[y] + 1
               test = test + new_item[y].item()
               averageValue[y] = averageValue[y] + new_item[y].item() 
            
          
    print("t", test)
    # f.write(similarities)
    # tensor([[1.0000, 0.6660, 0.1046],
    #         [0.6660, 1.0000, 0.1411],
    #         [0.1046, 0.1411, 1.0000]])
f.close()
test 
# The sentences to encode
sentences = [
    "Computer Application Essentials (Empoweing Your Future)",
    " Empowering Your Future CTB104 [Computer App Essntials]",
    " Computer Application Essentials INFO 101",
]

print(averageValue)
print("Articulation", "High School Classes",  )
averageTest = [["Articulation", "High School Classes", "College Courses"], [0, 0, 0]]
for x in range(len(averageValue)): 
    averageTest[x] = averageValue[x]/count[x]
# 2. Calculate embeddings by calling model.encode()
embeddings = model.encode(sentences)
print(embeddings.shape)
# [3, 384]

# 3. Calculate the embedding similarities
similarities = model.similarity(embeddings, embeddings)
print(similarities)
# tensor([[1.0000, 0.6660, 0.1046],
#         [0.6660, 1.0000, 0.1411],
#         [0.1046, 0.1411, 1.0000]])