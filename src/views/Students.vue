<template>
  <div>
    <h1>Student Picture Directory</h1>
    <div class="directory">
      <div class="student" v-for="student in students" :key="student.UserId">
        <img :src="student.Image"><br>
        {{student.FirstName}} {{student.LastName}}<br>
        {{student.StudentInfo.GradeLevel}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      students: []
    }
  },
  methods: {
    loadStudents() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      onApi(d).then(data => {
        this.students = data
        for (const [i, student] of this.students.entries()) {
          getImage(d, student.UserId, i).then(data => {
            const s = this.students[data.index]
            this.$set(s, 'Image', data.image)
          })
        }
      })
    }
  },
  mounted: function() {
    this.loadStudents()
  }
}

async function getImage(f, id, i) {
  const student = await f({ url: `user/${id}`, params: {} })
  let image =
    'https://covenantchristian.myschoolapp.com/app/content/images/user.png'
  if (student.data.ProfilePhotoFile.Attachment) {
    image =
      'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1465/user/' +
      student.data.ProfilePhotoFile.Attachment
  }
  return {
    index: i,
    image
  }
}

async function onApi(f) {
  const g1 = await f({ url: `user/all`, params: { roleIDs: 62830 } })
  const g2 = await f({
    url: `user/all`,
    params: { roleIDs: 62830, startRow: 201, endRow: 400 }
  })
  return g1.data.concat(g2.data)
}
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
