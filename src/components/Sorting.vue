<template>
<div class="sorting-container">
  <span class="to-sort">Сортировать по:</span>

  <span class="sort-button" data-sort="description">
    <label>
      типу продукта
      <select v-model="selectedDescription" @change="filterProducts" id="sort-description">
        <option value="">все</option>
        <option value="парфюмерная вода">парфюмерная вода</option>
        <option value="туалетная вода">туалетная вода</option>
        <option value="духи">концентрант духов</option>
        <option value="парфюмированный дезодорант">дезодорант</option>
        <option value="увлажняющий крем для тела">крем для тела</option>
        <option value="молочко для тела">молочко для тела</option>
        <option value="мыло для тела">мыло твердое</option> 
        <option value="жидкое мыло">мыло жидкое</option> 
        <option value="парфюмированный гель для душа">гель для душа</option>
      </select>
    </label>
  </span>

  <span class="sort-button" data-sort="name">
    <label>
      коллекции 
      <select v-model="selectedName" @change="filterProducts" id="sort-name">
        <option value="">все</option>
        <option value="J`adore">J`adore</option>
        <option value="Miss Dior">Miss Dior</option>
        <option value="Joy by Dior">Joy by Dior</option>
        <option value="Dior Addict">Dior Addict</option>
        <option value="Hypnotic Poison">Hypnotic Poison</option>
        <option value="Lucky">Lucky</option>
      </select>
    </label>
  </span>

  <span class="sort-button" data-sort="volume">
    <label>
      объему 
      <select v-model="selectedVolume" @change="filterProducts" id="sort-volume">
        <option value="">Все</option>
        <option value="15мл">15мл</option>
        <option value="20мл">20мл</option>
        <option value="30мл">30мл</option>
        <option value="50мл">50мл</option>
        <option value="90мл">90мл</option>
        <option value="100мл">100мл</option>
        <option value="125мл">125мл</option>
        <option value="200мл">200мл</option>
        <option value="350мл">350мл</option>
        <option value="150гр">150гр</option>
        <option value="16гр">16гр</option>
      </select>
    </label>
  </span>

  <span class="sort-button" data-sort="volume">
    <label>стойкости   
      <select v-model="selectedIntensity" @change="filterProducts" id="sort-intensivity">
        <option value="">Все⠀⠀⠀</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
  </span>

  <span class="sort-button" data-sort="price">
    <label>цене
      <select v-model="selectedPrice" @change="filterProducts" id="sort-price">
        <option value="">Все</option>
        <option value="high-price">Сначала дорогие</option>
        <option value="low-price">Сначала недорогие</option>
      </select>
    </label>
  </span>
</div>

</template>

<script>
export default {
  props: {
    products: Array,
    currentIndex: Number,
  },

  data() {
    return {
      selectedVolume: '',
      selectedIntensity: '',
      selectedPrice: '',
      selectedName: '',
      selectedDescription: '',
    };
  },

  computed: {
    filteredProducts() {
      let filtered = [...this.products];
      
      if (this.selectedDescription) {
        filtered = filtered.filter(product => product.description === this.selectedDescription);
      }

      if (this.selectedName) {
        filtered = filtered.filter(product => product.name === this.selectedName);
      }

      if (this.selectedVolume) {
        filtered = filtered.filter(product => product.volume === this.selectedVolume);
      }
      
      if (this.selectedIntensity) {
        filtered = filtered.filter(product => product.intensity.toString() === this.selectedIntensity);
      }
      
      if (this.selectedPrice === 'low-price') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (this.selectedPrice === 'high-price') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }

      return filtered.slice(0, this.currentIndex);
    },
  },

  watch: {
    // Следим за изменениями в фильтрах и пересчитываем filteredProducts
    selectedVolume: 'filterProducts',
    selectedIntensity: 'filterProducts',
    selectedPrice: 'filterProducts',
    selectedName: 'filterProducts',
    selectedDescription: 'filterProducts'
  },

  methods: {
    filterProducts() {
      if (!this.products || this.products.length === 0) {
      console.log('Данные не были получены или пусты.');
      return;
    }

        if (this.products && this.products.length > 0) {
        let filtered = [...this.products];

        if (this.selectedDescription) {
          console.log('Фильтрация по описанию продукта:', this.selectedDescription);
          filtered = filtered.filter(product => product.description === this.selectedDescription);
        }

        if (this.selectedName) {
          console.log('Фильтрация по коллекции:', this.selectedName);
          filtered = filtered.filter(product => product.name === this.selectedName);
        }

        if (this.selectedVolume) {
          console.log('Фильтрация по объему:', this.selectedVolume);
          filtered = filtered.filter(product => product.volume === this.selectedVolume);
        }

        if (this.selectedIntensity) {
          console.log('Фильтрация по интенсивности:', this.selectedIntensity);
          filtered = filtered.filter(product => product.intensity.toString() === this.selectedIntensity);
        }

        if (this.selectedPrice === 'low-price') {
          console.log('Сортировка по низкой цене');
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (this.selectedPrice === 'high-price') {
          console.log('Сортировка по высокой цене');
          filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        console.log('Отфильтрованные продукты:', filtered);

        this.$emit('filterProducts', filtered);
      }
    }
  },
}

</script>

