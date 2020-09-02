<template>
    <div class="gallery">
        <div v-for="c in galleryContent" :key="c.title" class="clipped-border" :style="getStyleObject(c)"
             @click.prevent.stop="showModal({contentComponent: c.view, title: c.title})">
            <h2>
                {{ c.title }}
            </h2>
        </div>
        <project-modal v-on:project-modal-close="hideModal" :title="modalTitle" :content-component="currentProjectView"
                       :visible="projectVisible"/>
    </div>
</template>

<script>
import ProjectModal from "@/components/ProjectModal";

export default {
    name: "HexGallery",
    components: {ProjectModal},
    comments: {
        ProjectModal
    },
    props: {
        galleryContent: Array
    },
    methods: {
        getStyleObject: function (item) {
            return {
                backgroundImage: "url(\"" + item.image + "\")",
                backgroundSize: "cover",
            }
        },
        showModal: function (params) {
            this.modalTitle = params.title;
            this.currentProjectView = params.contentComponent;
            this.projectVisible = true;
        },
        hideModal: function () {
            this.projectVisible = false;
        }
    },
    data: function () {
        return {
            currentProjectView: undefined,
            projectVisible: false,
            modalTitle: undefined,
        }
    }
}
</script>

<style lang="scss" scoped>
$hex-height: 250px;
$hex-side-offset: $hex-height * 0.433;
$hex-top-offset: $hex-height * -0.25;
$gallery-width-x2: $hex-height * 1.433;
$gallery-width-x3: $hex-height * 2 - 0.067 * 2 * $hex-height;
$gallery-width-x4: $hex-height * 2.5 - 0.067 * 3 * $hex-height;
$gallery-width-x5: $hex-height * 3 - 0.067 * 4 * $hex-height;

.gallery {
  position: relative;
  margin: 0 auto;
}

.clipped-border > h2 {
  color: white;
  text-align: center;
  text-shadow: 0 0 8px #000;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88%;
}

.clipped-border {
  -webkit-clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
  clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
  background: linear-gradient(darkgrey, #0f0f0f);
  width: $hex-height;
  height: $hex-height;
  transition: transform 0.2s ease;
  position: relative;
  cursor: pointer;
  filter: saturate(0.2);
  background-position-x: center;
  background-position-y: center;
  z-index: 400;
}

.clipped-border:hover {
  transform: scale(1.2);
  transition: transform 0.1s;
  z-index: 500;
  filter: saturate(1);
}

.gallery {
  width: $hex-height;
}

@media screen and (min-width: $gallery-width-x2) and (max-width: $gallery-width-x3 - 1px) {
  .gallery {
    width: $gallery-width-x2;
  }

  .clipped-border {
    margin-top: $hex-top-offset;
  }

  .clipped-border:nth-of-type(even) {
    margin-left: $hex-side-offset;
  }
}


@media screen and (min-width: $gallery-width-x3) and (max-width: $gallery-width-x4 - 1px) {
  .gallery {
    width: $gallery-width-x3;
  }
  .clipped-border:nth-of-type(3n+1) {
    margin-top: $hex-top-offset;
  }
  .clipped-border:nth-of-type(3n+2) {
    margin-top: -1 * $hex-height;
    margin-left: $hex-side-offset * 2;
  }
  .clipped-border:nth-of-type(3n+3) {
    margin-top: $hex-top-offset;
    margin-left: $hex-side-offset;
  }

}

@media screen and (min-width: $gallery-width-x4) and (max-width: $gallery-width-x5 - 1px) {
  .gallery {
    width: $gallery-width-x4;
  }
  .clipped-border:nth-of-type(4n+1) {
    margin-top: $hex-top-offset;
  }
  .clipped-border:nth-of-type(4n+2) {
    margin-top: -1 * $hex-height;
    margin-left: $hex-side-offset * 2;
  }
  .clipped-border:nth-of-type(4n+3) {
    margin-top: $hex-top-offset;
    margin-left: $hex-side-offset;
  }
  .clipped-border:nth-of-type(4n+4) {
    margin-top: $hex-top-offset * 4;
    margin-left: $hex-side-offset * 3;
  }

}

@media screen and (min-width: $gallery-width-x5) {
  .gallery {
    width: $gallery-width-x5;
  }
  .clipped-border:nth-of-type(5n+1) {
    margin-top: $hex-top-offset;
  }
  .clipped-border:nth-of-type(5n+2) {
    margin-top: -1 * $hex-height;
    margin-left: $hex-side-offset * 2;
  }
  .clipped-border:nth-of-type(5n+3) {
    margin-top: -1 * $hex-height;
    margin-left: $hex-side-offset * 4;
  }
  .clipped-border:nth-of-type(5n+4) {
    margin-top: $hex-top-offset;
    margin-left: $hex-side-offset;
  }
  .clipped-border:nth-of-type(4n+5) {
    margin-top: $hex-top-offset * 4;
    margin-left: $hex-side-offset * 3;
  }

}

// overrides
.clipped-border:first-child {
  margin-top: 0;
}
</style>