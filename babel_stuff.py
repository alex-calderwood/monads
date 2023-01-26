import os, sys
from pprint import pprint
file = "./babelnet_conf.yml"
api_key = "b4fe4e71-0b56-40ae-a5ce-f9f9f044f27d"
with open(file, 'w') as f:
  f.write(f"RESTFUL_KEY: '{api_key}'")
os.environ["BABELNET_CONF"] = "/Users/alex/code/poetry/babelnet_conf.yml"
import babelnet as bn
from babelnet.language import Language

# get synsets
def get_synset(word):
  print(f"word: {word}")
  byl = bn.get_synsets(word, from_langs=[Language.EN])
  return byl

byl = get_synset("scaling")

for synset in byl:
  print(synset.id)
  # print(type(synset._senses))
  # if synset._senses:
  senses = synset._senses
  print(senses)
  # print([s for s in synset._senses])
