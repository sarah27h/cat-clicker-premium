/*
*
* Model
*
*/

const model = {
    currentSelected: null,
    cats : [
        {
            name: 'Dydo',
            url: 'images/dydo.png',
            counter: 0
        },
        {
            name: 'Momo',
            url: 'images/momo.png',
            counter: 0
        },
        {
            name: 'Nano',
            url: 'images/nano.png',
            counter: 0
        },
        {
            name: 'Roro',
            url: 'images/roro.png',
            counter: 0
        },
        {
            name: 'Zazy',
            url: 'images/zazy.png',
            counter: 0
        }
    ]    
}


/*
*
* Octopus
*
*/

const octopus = {
    init: function() {
        model.currentSelected = model.cats[0];
        listView.init();
        displayView.init();
        adminView.init();
    },

    getCatsArray: function() {
        return model.cats;
    },

    getCurrentSelected: function() {
        return model.currentSelected;
    },

    setCurrentSelected: function(cat) {
        model.currentSelected = cat;
    },

    getCatName: function(){
        return model.currentSelected.name;
    },

    getCatSrc: function() {
        return model.currentSelected.url;

    },

    getCatCounter: function() {
        return model.currentSelected.counter;
    },

    setCounterValue: function(clicks) {
        model.currentSelected.counter = clicks;
    },

    openAdminView: function(e) {
        e.preventDefault();        
        adminView.adminPanal.classList.remove("hidden");
        console.log(':D');
    },

    closeAdminView: function(e) {
        e.preventDefault();
        adminView.adminPanal.classList.add("hidden");
    },

    updatecurrentSelected: function(e) {
        e.preventDefault();
        model.currentSelected.name = adminView.name.value;
        model.currentSelected.url = adminView.url.value;
        model.currentSelected.counter = adminView.clicks.value;        
        console.log(model.currentSelected.name);
        listView.render();
        displayView.renderImage();
        this.closeAdminView();
    }
};


/*
*
* View
*
*/

const listView = {
    init: function() {
        this.catList = document.getElementById('cat_list');
        this.catImg = document.createElement('img');
        this.counter = document.querySelector('.click_num');
        this.render();
    },

    render: function() {
        // use octopus to get cats array
        const cats = octopus.getCatsArray();

        // empty the cat list to render the update
        this.catList.innerHTML = '';

        for(let i = 0; i < cats.length; i++) {
            //create list item for every cat name
            const li = document.createElement('li');
            let name = cats[i].name;
            const liText = document.createTextNode(name);
            li.appendChild(liText);
            this.catList.appendChild(li);
            console.log(name);
        
            /*  add eventlistener to every list item
            *   every time we click listitem we use cat vairable to hold
            *   cats values and use it to setCurrentSelected cat
            *   draw image
            */
            let cat = cats[i];
            li.addEventListener('click', function() {
                //draw img for the clicked one
                console.log(cat);
                octopus.setCurrentSelected(cat);
                displayView.renderImage();
            });  
        };
    }
};

const displayView = {
    init: function() {
        this.catImg = document.querySelector('.cat_img');
        this.counter = document.querySelector('.click_num');
        this.catName = document.querySelector('.cat_name')
        this.renderImage();
        // to solve this refers to displayView
        // not the document.body
        var self = this;
        this.catImg.addEventListener('click', function() {   
            self.incrementCounter();
        });
    },

    renderImage: function() { 
        let imgSrc = octopus.getCatSrc();          
        // set image name, src, counter
        this.catName.innerHTML = octopus.getCatName();
        this.catImg.setAttribute('src', octopus.getCatSrc());
        this.counter.innerHTML = octopus.getCatCounter();
    },

    incrementCounter: function() {
        let catCounter = octopus.getCatCounter();
        catCounter ++;
        octopus.setCounterValue(catCounter);
        this.counter.innerHTML = octopus.getCatCounter();
    }
};

var adminView = {
    init: function() {
        this.adminPanal = document.getElementById('admin_panal');        

        this.adminBtn = document.getElementById('admin');
        this.cancelBtn = document.getElementById('cancel');
        this.saveBtn = document.getElementById('save');
        
        this.adminBtn.addEventListener('click', octopus.openAdminView);
        this.cancelBtn.addEventListener('click', octopus.closeAdminView);
        this.name = document.getElementById('name');
        this.url = document.getElementById('url');
        this.clicks = document.getElementById('clicks');
        this.saveBtn.addEventListener('click', octopus.updatecurrentSelected);
        // this.render();       
    },

    render: function() {
               
    }
}

octopus.init();