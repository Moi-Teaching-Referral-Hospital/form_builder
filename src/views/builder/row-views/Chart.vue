<template>
    <div style="width: 100% !important;">
        <h4>{{ title }}</h4>
        <div style="width: 100% !important;" id="chart123"></div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        dataset: {
            type: Array,
            default: [],
            required: true,
        },
        labels: {
            type: Array,
            default: [],
            required: true,
        },
    },
    watch:{
        dataset(val){
            this.createChart();
        },
    },

    data() {
        return {
            currentChart: null,
        };
    },
    mounted() {
        this.createChart()
    },

    methods: {
        createChart() {
            const data = {
                labels: this.labels,
                datasets: this.dataset,
            }
            if (this.labels.length){
                this.currentChart = new frappe.Chart("#chart123", {  // or a DOM element,
                title: "",
                data: data,
                type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                height: 300,
                width: 700,
                colors: ['#7cd6fd', '#743ee2'],
                axisOptions: {
                    xIsSeries: true // default: false
                },
            })
            }

          

        },
        getFakeDataSet() {
            return [

                {
                    name: "Test Graph",
                    type: "line",
                    values: [1, 2, 3, 4],
                },
            ]
        },
        getFakeLabeSet() {
            return ["monday", "tuesday", "wednesday", "Thursday"]
        },


    },
};
</script>
<style>
svg {
    width: 100% !important;
    /* Other CSS properties, if needed */
}
</style>
  
  
  
  