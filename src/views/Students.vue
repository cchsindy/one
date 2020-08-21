<template>
  <div>
    <h1>Student Picture Directory</h1>
    <div class="directory">
      <div class="student" v-for="student in students" :key="student.UserId">
        <img :src="student.image" />
        <br />
        <span v-if="student.preferred">{{student.preferred}}</span>
        <span v-else>{{student.first}}</span>
        {{student.last}}
        <br />
        {{student.classof}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      students: [],
    };
  },
  methods: {
    loadStudents() {
      this.$store.state.fbFunctions
        .httpsCallable("skyapi")({
          product: "school",
          url: "legacy/lists/106057",
        })
        .then((result) => {
          for (const row of result.data.rows) {
            this.students.push({
              id: parseInt(row.columns[0].value),
              last: row.columns[1].value,
              first: row.columns[2].value,
              preferred: row.columns[3].value,
              classof: row.columns[4].value,
              image: row.columns[5].value
                ? "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1465/user/" +
                  row.columns[5].value
                : "https://covenantchristian.myschoolapp.com/app/content/images/user.png",
            });
          }
        });
    },
  },
  mounted: function () {
    this.loadStudents();
  },
};
</script>

<style scoped>
.directory {
  display: flex;
  flex-wrap: wrap;
}
.student {
  background: #fff;
  flex-grow: 1;
  margin: 1vw;
  padding: 1vw;
}
.student img {
  width: 150px;
}
</style>
