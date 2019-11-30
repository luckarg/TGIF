function ConseguirEstados() {
    var MenuDropDown = "";
    var ContenidoDropDown = [];
    data.results[0].members.forEach(function (miembro) {

        if (ContenidoDropDown.indexOf(miembro.state) == -1) {
            ContenidoDropDown.push(miembro.state);
        }
    });

    ContenidoDropDown.sort();
    ContenidoDropDown.unshift("ALL");
    ContenidoDropDown.forEach(function (state) {
        MenuDropDown += '<option val="' + state + '">' + state + '</option>';
    });

    statelist.innerHTML = MenuDropDown;
}
ConseguirEstados();

function tabla(){
    var miembros;
    var tablaMiembros;
    var partySelected;
    var states; 
    
    states = document.querySelector('#statelist').value
    
    
    miembros = data.results[0].members;
    
    tablaMiembros=      '<tr>'+
                        '<th>Name</th>'+
                        '<th>Party</th>'+
                        '<th>State</th>'+
                        '<th>Seniority</th>'+
                        '<th>Votes with party</th>'+
                        '<tr>';
    
    partySelected = Array.from(document.querySelectorAll('input[name=party]:checked')).map(x => x.value);

    for(var i=0;i<miembros.length;i++){
        //checkbox+dropdown
        if(partySelected.indexOf(miembros[i].party) !== -1 && (states == miembros[i].state || states == "ALL")){
                     tablaMiembros+=
                     '<tr>'+
                     '<td><a href='+miembros[i].url+'> '+ miembros[i].first_name+' '+(miembros[i].middle_name || '')+' '+miembros[i].last_name+'</td>'+
                     '<td>'+miembros[i].party+'</td>'+
                     '<td>'+miembros[i].state+'</td>'+
                     '<td>'+miembros[i].seniority+'</td>'+
                     '<td>'+miembros[i].votes_with_party_pct+'%</td>'+
                     '</tr>';
                }
            }
                  
            
    return tablaMiembros;

}



document.getElementById("tablemembers").innerHTML = tabla();  
 
document.getElementById("D").addEventListener("click", function(){
    document.getElementById("tablemembers").innerHTML = tabla();
    });  

document.getElementById("R").addEventListener("click", function(){
    document.getElementById("tablemembers").innerHTML = tabla();
    });  

document.getElementById("I").addEventListener("click", function(){
    document.getElementById("tablemembers").innerHTML = tabla();
    });  

document.getElementById("statelist").addEventListener("change", function(){
    document.getElementById("tablemembers").innerHTML = tabla();
    });  


