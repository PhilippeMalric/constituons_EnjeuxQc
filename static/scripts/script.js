var prix_dictionnaire = {}
prix_dictionnaire["escargot"] = { "prix": 595, "image": "/images/escargot.jpg" } 
prix_dictionnaire["salade"] = { "prix": 495, "image": "/images/salade.jpg" } 
prix_dictionnaire["lasagne"] = { "prix": 995, "image": "/images/lasagne.jpg" }
prix_dictionnaire["spaghetti"] = { "prix": 895, "image": "/images/spaghetti.jpg" }
prix_dictionnaire["choisir..."] = { "prix": 0, "image": "/images/vide.jpg" }

var loaded = function () {


  var entree_select = document.getElementById("menu_entree");
  var option = document.createElement("option");
  option.text = "choisir...";
  entree_select.add(option);
  var option = document.createElement("option");
  option.text = "escargot";
  entree_select.add(option);
  var option = document.createElement("option");
  option.text = "salade";
  entree_select.add(option);

  var repas_select = document.getElementById("menu_repas");
  var option = document.createElement("option");
  option.text = "choisir...";
  repas_select.add(option);
  var option = document.createElement("option");
  option.text = "lasagne";
  repas_select.add(option);
  var option = document.createElement("option");
  option.text = "spaghetti";
  repas_select.add(option);


  

  console.log(document)

}

var dropdown_onchange = function () {


  var entree_select_value = document.getElementById("menu_entree").value;
  document.getElementById("prix_entree").innerHTML = "" +(prix_dictionnaire[entree_select_value].prix / 100) +" $"
  document.getElementById("image_entree").src = prix_dictionnaire[entree_select_value].image


  var repas_select_value = document.getElementById("menu_repas").value;
  document.getElementById("prix_repas").innerHTML = ""+(prix_dictionnaire[repas_select_value].prix / 100) +" $"
  document.getElementById("image_repas").src = prix_dictionnaire[repas_select_value].image

  sous_total = (prix_dictionnaire[entree_select_value].prix + prix_dictionnaire[repas_select_value].prix) / 100
  document.getElementById("sous-total").innerHTML = sous_total.toFixed(2) + " $"

  taxes = sous_total / 100 * 15
  document.getElementById("taxes").innerHTML = taxes.toFixed(2) + " $"

  total = sous_total + taxes
  document.getElementById("total").innerHTML = total.toFixed(2) + " $"
}
