async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function getData(id) {
    await sleep(3*1000);
    return [
	{id: 1, text: id + " Option - 1"},
	{id: 2, text: id + " Option - 2"},
	{id: 3, text: id + " Option - 3"},
	{id: 4, text: id + " Option - 4"},
	{id: 5, text: id + " Option - 5"},
	{id: 6, text: id + " Option - 6"},
	{id: 7, text: id + " Option - 7"},
	{id: 8, text: id + " Option - 8"}
    ];
};



class SearchFieldComponent {
    constructor() {
	this.changesCounter = 0;
	this.loadingData = false;
	this.searchText = ko.observable('');
	
	this.selectedOption = null;
	this.placeholder = ko.observable('');
	this.options = ko.observableArray([]);

	window.addEventListener('click', event => {
	    this.options([]);
	    this.placeholder("");
	});
    }
    selectOption(data, event) {
	this.selectedOption = data;
	this.searchText(data.text);
	this.options([]);
	this.placeholder("");
    }
    onKeyup(data, event) {
	if(this.loadingData)
	    return;
	this.placeholder("Stop typing to search");
	let currentChangeId = ++this.changesCounter;
	setTimeout(async () => {
	    if(this.changesCounter === currentChangeId && this.searchText()) {
		this.loadingData = true;
		this.placeholder("Loading data ...");
		this.options(await getData(currentChangeId));
		this.placeholder("Choose account");
		this.loadingData = false;
	    }
	}, 2*1000);
    }
}


let viewModel = new SearchFieldComponent();
window.viewModel = viewModel;
    

ko.applyBindings(viewModel);
