class Tab {
    constructor(componentName, title, tabViewModel=null) {
	this.componentName = componentName;
	this.tabsViewModel = tabViewModel;
	this.title = ko.observable(title);
    };
    show() { this.tabsViewModel.showTab(this); };
};


class TabsViewModel {
    constructor(tabs=null, current=null) {
	if(tabs) for(let tab of tabs)
	    tab.tabsViewModel = this;
	this.tabs = ko.observable(tabs || []);
	this.current = ko.observable((tabs && tabs[current || 0]) || null);
    };
    showTab(tab) {
	for(let t of this.tabs())
	    if(Object.is(t, tab))
		this.current(tab);
    };
};


ko.components.register('tabs-view', {
    viewModel: function(params) {
	let tabs = params.tabsDesc.map(it => new Tab(it.component, it.title));
	let tabViewModel = new TabsViewModel(tabs);
	return tabViewModel;
    },
    template: document.querySelector("#tabs-view-template").innerHTML
});


ko.components.register('a-component', {
    template: document.querySelector("#a-view").innerHTML
});

ko.components.register('b-component', {
    template: document.querySelector("#b-view").innerHTML
});


ko.applyBindings();
