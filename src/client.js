import Vue from 'vue';
import axios from 'axios';
import _ from 'underscore';

const app = new Vue({
  data: {
    rowsCount: 3,
    cloumnsCount: 4,
    showTable: false,

    tarifs: [],

    origins: [],
    consumers: [],

    dataTables: [],
  },

  components: {
    immutableSpan: {
	  	template: '<span v-once v-html="value"></span>',
  	  props: ['value']
    }
  },

  watch: {
    rowsCount(val){
      this.rowsCount = +val;
    },

    cloumnsCount(val){
      this.cloumnsCount = +val;
    }
  },

  methods: {
    fillTarifs(){
      for(let i = 0; i < this.rowsCount; i ++){
        this.tarifs[i] = [];
        for(let j = 0; j < this.cloumnsCount; j++){
          this.tarifs[i][j] = 0;
        }
      }
    },
    createTable(){      
      try{
        this.origins = new Array(this.rowsCount).fill(0);
        this.consumers = new Array(this.cloumnsCount).fill(0);
        this.fillTarifs();

        this.dataTables = [];
        // this.tarifs = 
        //   [ [6,	6,	8,	5,	4,	3	],
        //     [2,	4,	3,	9,	8,	5	],
        //     [3,	5,	7,	9,	6,	11],
        //     [3,	5,	4,	4,	2,	1	],
        //     [2,	5,	6,	3,	2,	8	] ];
        
        // this.origins = [130, 55, 80, 65, 135];
        // this.consumers = [130, 75, 65, 60, 75, 60];
  
        console.log(this.tarifs, this.origins, this.consumers)
        this.showTable = true;
      }catch(e){
        console.log(e);
      }
    },
    async solveTask(){
      this.dataTables = [];
      // const res = solve(this.tarifs, this.origins, this.consumers, this.addData);

      const url = `/solve/?supply=${
        JSON.stringify(this.origins.map(e => +e))
      }&demand=${
        JSON.stringify(this.consumers.map(e => +e))
      }&costs=${
        JSON.stringify(this.tarifs.map(r => r.map(e => +e)))
      }`;

      const { data: { routes, z} } = await axios.get(url);
      const flatTarifs = _.flatten(this.tarifs);

      alert('Задача решена!');
      this.addData({
        table: routes,
        comment: 'Z = ' + _.flatten(routes)
          .map((r, i) => r ? `${r}*${flatTarifs[i]}` : null)
          .filter(r => !!r)
          .join(' + ') + ' = ' + z
      });
    },

    addData(data){
      this.dataTables.push(data);
    },

    onTarifChange(e){
      let { value, id } = e.target;
      id = id.split('-').map(v => +v);

      console.log(id, this.tarifs[id[0]][id[1]]);
      this.tarifs[id[0]][id[1]] = +value;
    }
  }
}).$mount('#app')