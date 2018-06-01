<template>
  <div class="n-modal-wrapper n-full-back">
    <!-- Modal Header -->
    <div class="n-modal-header">
      <div class="n-responsive-container">
        <!-- Title -->
        <div class="n-aligned-title">
          <i class="fa fa-plane" aria-hidden="true"></i>&nbsp;
          <span v-if="selectedAirplaneData && selectedAirplaneData.Icao"><b>{{selectedAirplaneData.Icao}}</b></span>
        </div>
        <!-- Close button -->
        <button class="n-btn n-close-btn" v-on:click="closeModal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;</button>
      </div>
    </div>
    <!-- Modal Body -->
    <div class="n-modal-body n-has-header">
      <div class="n-responsive-container">
        <!-- Blue back section title -->
        <div class="n-section-title">Flight informations</div>
        <!-- Airplane Manufacturer & Model -->
        <div class="n-grid-row">
          <div class="n-col-6">
            <div class="n-form-group">
              <label>Airplane Manufacturer</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.Man">{{selectedAirplaneData.Man}}</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
          <div class="n-col-6">
            <div class="n-form-group">
              <label>Airplane Model</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.Type">{{selectedAirplaneData.Type}}</span>
                <span v-else>--</span>                
              </div>
            </div>
          </div>                   
        </div>
        <!-- Flight destination Airport -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Flight destination Airport</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.From">{{selectedAirplaneData.From}}</span>
                <span v-else>--</span>                 
              </div>
            </div>
          </div>
        </div>
        <!-- Flight origin Airport -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Flight origin Airport</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.To">{{selectedAirplaneData.To}}</span>
                <span v-else>--</span>                   
              </div>
            </div>
          </div>
        </div>
        <!-- Airline company -->
        <div class="n-grid-row">
          <div class="n-col-12">
            <div class="n-form-group">
              <label>Airline company</label>
              <div class="n-form-control">
                <span v-if="selectedAirplaneData.Op">{{selectedAirplaneData.Op}}</span>
                <span v-else>--</span>                  
              </div>
            </div>
          </div>
        </div>         
      </div>
    </div>  
    <!-- Modal Footer -->
    <div class="n-modal-footer">
      <div class="n-responsive-container n-text-center">
        <button class="n-btn n-btn-primary" v-on:click="closeModal">Close</button>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalSingleFlightDetails',
  props: ['inputModalData'],
  data() {
    return {
      selectedAirplaneData: null
    }
  },
  methods: {
    closeModal: function (){
      this.reject();
    }
  },
  created: function () {
    console.log('--created--ModalSingleFlightDetails')
    if (this.inputModalData){
      if (this.inputModalData.selectedAirplaneObject){        
        console.log('selectedAirplaneObject: ' + JSON.stringify(this.inputModalData.selectedAirplaneObject, null, 2));
        this.selectedAirplaneData = this.inputModalData.selectedAirplaneObject;
      }
      this.resolve = this.inputModalData.resolve;
      this.reject = this.inputModalData.reject;
    }    
  },
  mounted: function () {
    console.log('--mounted--ModalSingleFlightDetails')
  },
  destroyed: function () {
    console.log('--destroyed--ModalSingleFlightDetails')
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
