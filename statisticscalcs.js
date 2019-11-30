var statistics = {
    "numD": 0,
    "numR": 0,
    "numI": 0,
    "votesD": 0,
    "votesR": 0,
    "votesI": 0,
    "votestotal": 0,
    "masPresente": [],
    "menosPresente": [],
    "menosLeal": [],
    "masLeal": []
}

var miembros = data.results[0].members;

var arrayOfPresents = miembros.filter(miembro => miembro.total_votes != 0);
//excluyo a los total_votes = 0 durante el periodo del Congress, dado que su % Missed = 0% no es por engage sino por ausencia.
//Ese error mostraría al tope de la lista con "menos faltas" a los que tienen... 100% de faltas
//viendo mejor: esos "ausentes" pero listados en verdad son "delegados" sin derecho al voto (de territorios como Guam)
console.log(arrayOfPresents);

function presente(){
    statistics.votesR = 0;
    statistics.votesD = 0;
    statistics.votesI = 0;
    statistics.votestotal = 0;

    for(var i=0;i<miembros.length;i++){
        statistics.votestotal += miembros[i].votes_with_party_pct;
        switch(miembros[i].party){
            case "R": 
            statistics.numR += 1;
            statistics.votesR += miembros[i].votes_with_party_pct;
            break;
            case "D":
            statistics.numD += 1;
            statistics.votesD += miembros[i].votes_with_party_pct;
            break;
            case "I":
            statistics.numI += 1;
            statistics.votesI += miembros[i].votes_with_party_pct;
            break;
        }
    }
    
    statistics.votesD = (statistics.votesD/statistics.numD).toFixed(2)+"%"; //decimales
    statistics.votesR = (statistics.votesR/statistics.numR).toFixed(2)+"%";
    if(statistics.votesI != 0){
        statistics.votesI = (statistics.votesI/statistics.numI).toFixed(2)+"%";
        }else{
            statistics.votesI = "N/A";
    }
    statistics.votestotal = (statistics.votestotal/miembros.length).toFixed(2)+"%";
        console.log(statistics);
        
    var table = "<tr>"+"<th>Party</th>"+"<th>Representants</th>"+"<th>% voted w/Party</th>"+"</tr>"+
    "<tr>"+"<td>Democrats</td>"+"<td>"+statistics.numD+"</td>"+"<td>"+statistics.votesD+"</td>"+"</tr>"+
    "<tr>"+"<td>Republicans</td>"+"<td>"+statistics.numR+"</td>"+"<td>"+statistics.votesR+"</td>"+"</tr>"+
    "<tr>"+"<td>Independents</td>"+"<td>"+statistics.numI+"</td>"+"<td>"+statistics.votesI+"</td>"+"</tr>"+
    "<tr>"+"<td>Total</td>"+"<td>"+miembros.length+"</td>"+"<td>"+statistics.votestotal+"</td>"+"</tr>"; 
    return table;       
}
if(document.getElementById("presente")){
    document.getElementById("presente").innerHTML = presente();
}



function menosPresente (){
    var orderArr = arrayOfPresents.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    })
    var orderMissedArr = [];
    for (i = 0; i < orderArr.length; i++) { 
        if (i < Math.floor(orderArr.length/10)) {  
            orderMissedArr.push(orderArr[i]);       //push en el límite del 10% para incluir repetidos
        } else if (orderArr[i].missed_votes_pct == orderArr[i - 1].missed_votes_pct) {
            orderMissedArr.push(orderArr[i]);
        } else {
            break;
        }
        statistics.menosPresente[i] = orderArr[i]
    }
    var tablaMenosPresente = "<tr>"+"<th>Name</th>"+"<th>Missed Votes</th>"+"<th>% Missed</th>"+"</tr>";
    for(var i = 0;i < statistics.menosPresente.length; i++){
        tablaMenosPresente += '<tr>'+
        '<td><a href='+statistics.menosPresente[i].url+'> '+statistics.menosPresente[i].first_name+' '+(statistics.menosPresente[i].middle_name || '')+' '+statistics.menosPresente[i].last_name+'</td>'+
            '<td>'+statistics.menosPresente[i].missed_votes+'</td>'+
            '<td>'+statistics.menosPresente[i].missed_votes_pct.toFixed(2)+'%</td>'+'</tr>';
        }
    console.log(statistics.menosPresente.length);
    return tablaMenosPresente;
}
if(document.getElementById("menosPresente")){
    document.getElementById("menosPresente").innerHTML = menosPresente(); //visible sólo en attendance
}

function masPresente (){
    var orderArr = arrayOfPresents.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    })
    var orderMissedArr = [];

    for (i = 0; i < orderArr.length; i++) { 
        if (i < Math.floor(orderArr.length/10)) { 
            orderMissedArr.push(orderArr[i]);      //push en el límite del 10% para incluir repetidos
        } else if (orderArr[i].missed_votes_pct == orderArr[i - 1].missed_votes_pct) {
            orderMissedArr.push(orderArr[i]);
        } else {
            break;
        }
        statistics.masPresente[i] = orderArr[i]
    }
    var tablaMasPresente = "<tr>"+"<th>Name</th>"+"<th>Missed Votes</th>"+"<th>% Missed</th>"+"</tr>";
    for(var i = 0;i < statistics.masPresente.length; i++){
        tablaMasPresente += '<tr>'+
        '<td><a href='+statistics.masPresente[i].url+'> '+statistics.masPresente[i].first_name+' '+(statistics.masPresente[i].middle_name || '')+' '+statistics.masPresente[i].last_name+'</td>'+
            '<td>'+statistics.masPresente[i].missed_votes+'</td>'+
            '<td>'+statistics.masPresente[i].missed_votes_pct.toFixed(2)+'%</td>'+'</tr>';
        }
    console.log(statistics.masPresente.length);
    return tablaMasPresente;
}
if(document.getElementById("masPresente")){
    document.getElementById("masPresente").innerHTML = masPresente(); //visible sólo en attendance
}

    function menosLeal (){
        var orderArr = arrayOfPresents.sort(function (a, b) {
            return a.votes_with_party_pct - b.votes_with_party_pct
        })
        var orderWPartyArr = [];
    
        for (i = 0; i < orderArr.length; i++) { 
            if (i < Math.floor(orderArr.length/10)) { 
                orderWPartyArr.push(orderArr[i]);      //push en el límite del 10% para incluir repetidos
            } else if (orderArr[i].votes_with_party_pct == orderArr[i - 1].votes_with_party_pct) {
                orderWPartyArr.push(orderArr[i]);
            } else {
                break;
            }
            statistics.menosLeal[i] = orderArr[i]
        }
        var tablamenosLeal= "<tr>"+"<th>Name</th>"+"<th>Party Votes</th>"+"<th>% Party Votes</th>"+"</tr>";
        for(var i = 0;i < statistics.menosLeal.length;i++){
            tablamenosLeal+= '<tr>'+'<td><a href='+statistics.menosLeal[i].url+'> '+
            statistics.menosLeal[i].first_name+' '+(statistics.menosLeal[i].middle_name || '')+' '+statistics.menosLeal[i].last_name+'</td>'+
            '<td>'+Math.round((statistics.menosLeal[i].total_votes-statistics.menosLeal[i].missed_votes)*statistics.menosLeal[i].votes_with_party_pct/100)+'</td>'+'<td>'+statistics.menosLeal[i].votes_with_party_pct.toFixed(2)+'%</td>'+'</tr>';
    }  
    return tablamenosLeal;
    }
    if(document.getElementById("menosLeal")){
        document.getElementById("menosLeal").innerHTML = menosLeal(); //visible sólo en loyalty
    }
    


    function masLeal (){
        var orderArr = arrayOfPresents.sort(function (a, b) {
            return b.votes_with_party_pct - a.votes_with_party_pct
        })
        var orderWPartyArr = [];
    
        for (i = 0; i < orderArr.length; i++) { 
            if (i < Math.floor(orderArr.length/10)) { 
                orderWPartyArr.push(orderArr[i]);      //push en el límite del 10% para incluir repetidos
            } else if (orderArr[i].votes_with_party_pct == orderArr[i - 1].votes_with_party_pct) {
                orderWPartyArr.push(orderArr[i]);
            } else {
                break;
            }
            statistics.masLeal[i] = orderArr[i]
        }
        var tablaMasLeal= "<tr>"+"<th>Name</th>"+"<th>Party Votes</th>"+"<th>% Party Votes</th>"+"</tr>";
        for(var i = 0;i < statistics.masLeal.length;i++){
            tablaMasLeal+= '<tr>'+'<td><a href='+statistics.masLeal[i].url+'> '+
            statistics.masLeal[i].first_name+' '+(statistics.masLeal[i].middle_name || '')+' '+statistics.masLeal[i].last_name+'</td>'+
            '<td>'+Math.round((statistics.masLeal[i].total_votes-statistics.masLeal[i].missed_votes)*statistics.masLeal[i].votes_with_party_pct/100)+'</td>'+'<td>'+statistics.masLeal[i].votes_with_party_pct.toFixed(2)+'%</td>'+'</tr>';
    }  
    return tablaMasLeal;
    }
    if(document.getElementById("masLeal")){
        document.getElementById("masLeal").innerHTML = masLeal(); //visible sólo en loyalty
    }
    