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

octopus.init();