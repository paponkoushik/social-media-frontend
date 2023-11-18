<template>
  <header class="fixed-main-header">
    <div class="tabs">
      <div
        :class="{ 'active-tab': activeTab === 'tab1' }"
        @click="setActiveTab('tab1')"
      >
        For You
      </div>
      <div
        :class="{ 'active-tab': activeTab === 'tab2' }"
        @click="setActiveTab('tab2')"
      >
        Following
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeTab: 'tab1',
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
}
</script>

<style scoped>
.fixed-main-header {
  position: fixed;
  width: calc(100% - 560px);
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
}

.tabs div {
  flex: 1;
  text-align: center;
}

.active-tab {
  border-bottom: 2px solid #1da1f2;
  color: #1da1f2;
}
</style>