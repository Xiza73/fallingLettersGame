<template>
  <VueFinalModal
    class="modal__container"
    content-class="custom__modal"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :click-to-close="quickExit"
    :esc-to-close="quickExit"
  >
    <div v-if="title" class="header" :class="{ 'text-centered': titleCenter }">
      <h1>{{ title }}</h1>
      <div v-if="!noCloseIcon" class="close">
        <Icon @click="emit('cancel')" name="ion:close-round" />
      </div>
    </div>
    <div
      v-if="content"
      class="content"
      :class="{ 'text-centered': contentCenter }"
    >
      <p
        v-if="contentIsArray"
        v-for="sentence in content"
        :key="sentence.toString()"
      >
        {{ sentence }}
      </p>
      <p v-else>{{ content }}</p>
    </div>
    <div class="footer">
      <button v-if="confirm" @click="emit('confirm')" class="confirm">
        {{ confirm }}
      </button>
      <button v-if="cancel" @click="emit('cancel')" class="cancel">
        {{ cancel }}
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  title?: string | ComputedRef<string>;
  content?: string | string[] | ComputedRef<string | string[]>;
  confirm?: string | ComputedRef<string>;
  cancel?: string | ComputedRef<string>;
  quickExit?: boolean;
  noCloseIcon?: boolean;
  titleCenter?: boolean;
  contentCenter?: boolean;
}>();

const content = props.content;

const contentIsArray = content instanceof Array;

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<style lang="scss">
$header: #eeeeee;
$border: #d4d4d4;
$body: #f3f3f3;

.custom__modal {
  display: flex;
  flex-direction: column;
  padding: 0;
  max-width: 80%;
  border-radius: 0.5rem;
  border: 1px solid $border;
  background-color: $body;
  box-shadow: 0 0 1.5rem 0.1rem rgba(255, 255, 255, 0.521);
  @media (min-width: 768px) {
    max-width: 500px;
  }
  > * + * {
    margin: 0.5rem 0;
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: auto;
    background-color: $header;
    border-radius: 0.5rem 0.5rem 0 0;
    position: relative;
    &.text-centered {
      align-items: center;
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 700;
      padding: 1.6rem 2.3rem;
      @media (min-width: 425px) {
        font-size: 2.1rem;
      }
      @media (min-width: 768px) {
        font-size: 2.6rem;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 0.7rem;
      cursor: pointer;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: $border;
      }
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: $border;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: 2rem 2rem 0 2rem;
    &.text-centered {
      align-items: center;
    }
    p {
      font-size: 1.2rem;
      font-weight: 400;
      @media (min-width: 425px) {
        font-size: 1.4rem;
      }
      @media (min-width: 768px) {
        font-size: 1.6rem;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.8rem;
    width: 100%;
    height: auto;
    padding: 1.8rem 2rem 2rem 2rem;
    button {
      padding: 1rem 1.8rem;
      border: 0px solid;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      @media (min-width: 768px) {
        font-size: 1.4rem;
      }
      &.confirm {
        background: linear-gradient(
          to bottom right,
          rgb(200, 204, 255),
          rgb(184, 130, 255),
          rgb(144, 60, 255)
        );
        color: rgb(95, 15, 199);
        &:hover {
          background: linear-gradient(
            to bottom right,
            rgb(144, 60, 255),
            rgb(184, 130, 255),
            rgb(200, 204, 255)
          );
          color: rgb(59, 0, 136);
        }
        &:active {
          background: linear-gradient(
            to bottom right,
            rgb(200, 204, 255),
            rgb(184, 130, 255),
            rgb(144, 60, 255)
          );
          color: rgb(95, 15, 199);
        }
      }
      &.cancel {
        background: linear-gradient(
          to bottom right,
          rgb(255, 200, 200),
          rgb(255, 130, 130),
          rgb(255, 60, 60)
        );
        color: rgb(199, 15, 15);
        &:hover {
          background: linear-gradient(
            to bottom right,
            rgb(255, 60, 60),
            rgb(255, 130, 130),
            rgb(255, 200, 200)
          );
          color: rgb(136, 0, 0);
        }
        &:active {
          background: linear-gradient(
            to bottom right,
            rgb(255, 200, 200),
            rgb(255, 130, 130),
            rgb(255, 60, 60)
          );
          color: rgb(199, 15, 15);
        }
      }
    }
  }
}
</style>
