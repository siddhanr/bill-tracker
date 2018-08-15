function reloadBillTable(){
	$.getJSON("/bills/all", function(data){
		$('.bill-table').empty();
		$.each(data, function(key, val){
			var name = val.name;
			var amount = val.amount;
			$('.bill-table').append('<tr><td>' + name + '</td><td>$' + amount 
				+ '</td><td><button type="button" class="btn btn-danger" onclick="deleteBill(\''+ val._id 
				+ '\')">delete</button></td></tr>');
		});
	});
}

function reloadTotal(){
	$.getJSON("/bills/total", function(data){
		$('.total').empty();
		var total = data[0].total;
		$('.total').append('Total: $' + total + "/Month");
	});
}

function reloadAll(){
	reloadBillTable();
	reloadTotal();
}

function deleteBill(id){
	var confirmation = confirm("Are you sure?");
	if(confirmation){
		$.ajax({
		url:"/bills/delete/"+id,
		type:"DELETE",
	});
	reloadAll();
	} else {
		return false;
	}
};

reloadAll();

