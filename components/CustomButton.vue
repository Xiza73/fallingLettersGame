<template>
  <div
    type="button"
    class="button button_sm"
    :class="`button_${disable ? 'disabled' : buttonType} button_${size}`"
  >
    <Icon v-if="rigthIcon" :name="rigthIcon" />
    <span v-if="content">{{ content }}</span>
    <Icon v-if="leftIcon" :name="leftIcon" />
  </div>
</template>

<script setup lang="ts">

defineProps<{
  content?: string;
  leftIcon?: string;
  rigthIcon?: string;
  buttonType: CssVariable;
  size: Size;
  disable?: boolean;
}>();
</script>

<style scoped lang="scss">
$height: 65px;
$depth: 5px;
$lighten-on-hover: 4%;
$button-speed: 0.1s;
$timing-function: ease-out;
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2em;
  cursor: pointer;
  margin-left: 5px;
  margin-bottom: 15px;
  box-sizing: border-box;
  font-size: 2em;
  text-decoration: none;
  font-weight: bold;
  height: $height;
  line-height: $height;
  padding: 0 calc($height/2);
  width: auto;
  border-radius: 5px;
  top: 0;
  transition: all $button-speed $timing-function;
  position: relative;

  &:active {
    top: $depth;
    &:before {
      top: 0;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }

  &:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    top: $depth;
    pointer-events: none;
    border-radius: 5px;
    height: $height;
    transition: all calc($button-speed * 1.3) $timing-function;
    box-shadow: 0 1px 0 2px rgba(0, 0, 0, 0.3),
      0 5px calc($depth * 0.4) rgba(0, 0, 0, 0.5),
      0 calc($depth * 1.8) 9px rgba(0, 0, 0, 0.2);
  }
}

.button_sm {
  font-size: 1.2em;
  height: 36px;
  line-height: 36px;
  padding: 0 17px;
  &:before {
    height: 36px;
  }
  @media (min-width: 768px) {
    font-size: 1.5em;
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
    &:before {
      height: 50px;
    }
  }
}

.button_md {
  font-size: 1.5em;
  height: 50px;
  line-height: 50px;
  padding: 0 25px;
  &:before {
    height: 50px;
  }
  @media (min-width: 768px) {
    font-size: 2em;
    height: 65px;
    line-height: 65px;
    padding: 0 35px;
    &:before {
      height: 65px;
    }
  }
}

.button_lg {
  font-size: 2.1em;
  height: 65px;
  line-height: 65px;
  padding: 0 30px;
  &:before {
    height: 65px;
  }
  @media (min-width: 768px) {
    font-size: 2.5em;
    height: 80px;
    line-height: 80px;
    padding: 0 45px;
    &:before {
      height: 80px;
    }
  }
}

.button_primary {
  text-shadow: 0.03em -0.06em 0 darken($bprimary, 20%),
    0 1px 1px lighten($bprimary, 11%);
  color: darken($bprimary, 10%);
  &:visited {
    color: darken($bprimary, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($bprimary, 9%), 35%) 0%,
    saturate(lighten($bprimary, 2%), 15%) 26%,
    $bprimary 100%
  );
  border-top: 1px solid lighten($bprimary, 22%);
  border-bottom: 1px solid lighten($bprimary, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($bprimary, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($bprimary, 2%), 15%), $lighten-on-hover) 26%,
      lighten($bprimary, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($bprimary, 0%),
      0 1px 1px lighten($bprimary, 20%), 0 0 4px white;
    color: lighten($bprimary, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($bprimary, 40%), 15%) 0%,
      saturate(darken($bprimary, 25%), 10%) $depth
    );
  }
}

.button_disabled {
  text-shadow: 0.03em -0.06em 0 darken($bsecondary, 20%),
    0 1px 1px lighten($bsecondary, 11%);
  color: darken($bsecondary, 10%);
  &:visited {
    color: darken($bsecondary, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($bsecondary, 9%), 35%) 0%,
    saturate(lighten($bsecondary, 2%), 15%) 26%,
    $bsecondary 100%
  );
  border-top: 1px solid lighten($bsecondary, 22%);
  border-bottom: 1px solid lighten($bsecondary, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($bsecondary, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($bsecondary, 2%), 15%), $lighten-on-hover) 26%,
      lighten($bsecondary, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($bsecondary, 0%),
      0 1px 1px lighten($bsecondary, 20%), 0 0 4px white;
    color: lighten($bsecondary, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($bsecondary, 40%), 15%) 0%,
      saturate(darken($bsecondary, 25%), 10%) $depth
    );
  }
  pointer-events: none;
}

.button_danger {
  text-shadow: 0.03em -0.06em 0 darken($bdanger, 20%),
    0 1px 1px lighten($bdanger, 11%);
  color: darken($bdanger, 12%);
  &:visited {
    color: darken($bdanger, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($bdanger, 9%), 35%) 0%,
    saturate(lighten($bdanger, 2%), 15%) 26%,
    $bdanger 100%
  );
  border-top: 1px solid lighten($bdanger, 22%);
  border-bottom: 1px solid lighten($bdanger, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($bdanger, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($bdanger, 2%), 15%), $lighten-on-hover) 26%,
      lighten($bdanger, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($bdanger, 0%), 0 1px 1px lighten($bdanger, 20%),
      0 0 4px white;
    color: lighten($bdanger, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($bdanger, 15%), 15%) 0%,
      saturate(darken($bdanger, 10%), 10%) $depth
    );
  }
}

.button_success {
  text-shadow: 0.03em -0.06em 0 darken($bsuccess, 20%),
    0 1px 1px lighten($bsuccess, 11%);
  color: darken($bsuccess, 10%);
  &:visited {
    color: darken($bsuccess, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($bsuccess, 9%), 35%) 0%,
    saturate(lighten($bsuccess, 2%), 15%) 26%,
    $bsuccess 100%
  );
  border-top: 1px solid lighten($bsuccess, 22%);
  border-bottom: 1px solid lighten($bsuccess, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($bsuccess, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($bsuccess, 2%), 15%), $lighten-on-hover) 26%,
      lighten($bsuccess, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($bsuccess, 0%),
      0 1px 1px lighten($bsuccess, 20%), 0 0 4px white;
    color: lighten($bsuccess, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($bsuccess, 11%), 15%) 0%,
      saturate(darken($bsuccess, 16%), 10%) $depth
    );
  }
}

.button_warning {
  text-shadow: 0.03em -0.06em 0 darken($bwarning, 28%),
    0 1px 1px lighten($bwarning, 11%);
  color: darken($bwarning, 18%);
  &:visited {
    color: darken($bwarning, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($bwarning, 9%), 35%) 0%,
    saturate(lighten($bwarning, 2%), 15%) 26%,
    $bwarning 100%
  );
  border-top: 1px solid lighten($bwarning, 22%);
  border-bottom: 1px solid lighten($bwarning, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($bwarning, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($bwarning, 2%), 15%), $lighten-on-hover) 26%,
      lighten($bwarning, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($bwarning, 0%),
      0 1px 1px lighten($bwarning, 20%), 0 0 4px white;
    color: lighten($bwarning, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($bwarning, 40%), 15%) 0%,
      saturate(darken($bwarning, 25%), 10%) $depth
    );
  }
}

.button_info {
  text-shadow: 0.03em -0.06em 0 darken($binfo, 20%),
    0 1px 1px lighten($binfo, 11%);
  color: darken($binfo, 10%);
  &:visited {
    color: darken($binfo, 10%);
  }
  background: linear-gradient(
    to bottom,
    saturate(lighten($binfo, 9%), 35%) 0%,
    saturate(lighten($binfo, 2%), 15%) 26%,
    $binfo 100%
  );
  border-top: 1px solid lighten($binfo, 22%);
  border-bottom: 1px solid lighten($binfo, 20%);
  &:hover {
    background: linear-gradient(
      to bottom,
      lighten(saturate(lighten($binfo, 9%), 35%), $lighten-on-hover) 0%,
      lighten(saturate(lighten($binfo, 2%), 15%), $lighten-on-hover) 26%,
      lighten($binfo, $lighten-on-hover) 100%
    );
  }
  &:active {
    text-shadow: 0 -2px 0 darken($binfo, 0%), 0 1px 1px lighten($binfo, 20%),
      0 0 4px white;
    color: lighten($binfo, 45%);
    &:before {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
    }
  }
  &:before {
    background: linear-gradient(
      to top,
      saturate(darken($binfo, 15%), 15%) 0%,
      saturate(darken($binfo, 10%), 10%) $depth
    );
  }
}

.theme-dark {
  .button_primary {
    text-shadow: 0.03em -0.06em 0 darken($bprimary-dark, 20%),
      0 1px 1px lighten($bprimary-dark, 11%);
    color: darken($bprimary-dark, 10%);
    &:visited {
      color: darken($bprimary-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($bprimary-dark, 9%), 35%) 0%,
      saturate(lighten($bprimary-dark, 2%), 15%) 26%,
      $bprimary-dark 100%
    );
    border-top: 1px solid lighten($bprimary-dark, 22%);
    border-bottom: 1px solid lighten($bprimary-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($bprimary-dark, 9%), 35%), $lighten-on-hover)
          0%,
        lighten(saturate(lighten($bprimary-dark, 2%), 15%), $lighten-on-hover)
          26%,
        lighten($bprimary-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($bprimary-dark, 0%),
        0 1px 1px lighten($bprimary-dark, 20%), 0 0 4px white;
      color: lighten($bprimary-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($bprimary-dark, 40%), 15%) 0%,
        saturate(darken($bprimary-dark, 25%), 10%) $depth
      );
    }
  }

  .button_disabled {
    text-shadow: 0.03em -0.06em 0 darken($bsecondary-dark, 20%),
      0 1px 1px lighten($bsecondary-dark, 11%);
    color: darken($bsecondary-dark, 10%);
    &:visited {
      color: darken($bsecondary-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($bsecondary-dark, 9%), 35%) 0%,
      saturate(lighten($bsecondary-dark, 2%), 15%) 26%,
      $bsecondary-dark 100%
    );
    border-top: 1px solid lighten($bsecondary-dark, 22%);
    border-bottom: 1px solid lighten($bsecondary-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($bsecondary-dark, 9%), 35%), $lighten-on-hover)
          0%,
        lighten(saturate(lighten($bsecondary-dark, 2%), 15%), $lighten-on-hover)
          26%,
        lighten($bsecondary-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($bsecondary-dark, 0%),
        0 1px 1px lighten($bsecondary-dark, 20%), 0 0 4px white;
      color: lighten($bsecondary-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($bsecondary-dark, 40%), 15%) 0%,
        saturate(darken($bsecondary-dark, 25%), 10%) $depth
      );
    }
  }

  .button_success {
    text-shadow: 0.03em -0.06em 0 darken($bsuccess-dark, 20%),
      0 1px 1px lighten($bsuccess-dark, 11%);
    color: darken($bsuccess-dark, 10%);
    &:visited {
      color: darken($bsuccess-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($bsuccess-dark, 9%), 35%) 0%,
      saturate(lighten($bsuccess-dark, 2%), 15%) 26%,
      $bsuccess-dark 100%
    );
    border-top: 1px solid lighten($bsuccess-dark, 22%);
    border-bottom: 1px solid lighten($bsuccess-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($bsuccess-dark, 9%), 35%), $lighten-on-hover)
          0%,
        lighten(saturate(lighten($bsuccess-dark, 2%), 15%), $lighten-on-hover)
          26%,
        lighten($bsuccess-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($bsuccess-dark, 0%),
        0 1px 1px lighten($bsuccess-dark, 20%), 0 0 4px white;
      color: lighten($bsuccess-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($bsuccess-dark, 11%), 15%) 0%,
        saturate(darken($bsuccess-dark, 16%), 10%) $depth
      );
    }
  }

  .button_warning {
    text-shadow: 0.03em -0.06em 0 darken($bwarning-dark, 20%),
      0 1px 1px lighten($bwarning-dark, 11%);
    color: darken($bwarning-dark, 10%);
    &:visited {
      color: darken($bwarning-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($bwarning-dark, 9%), 35%) 0%,
      saturate(lighten($bwarning-dark, 2%), 15%) 26%,
      $bwarning-dark 100%
    );
    border-top: 1px solid lighten($bwarning-dark, 22%);
    border-bottom: 1px solid lighten($bwarning-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($bwarning-dark, 9%), 35%), $lighten-on-hover)
          0%,
        lighten(saturate(lighten($bwarning-dark, 2%), 15%), $lighten-on-hover)
          26%,
        lighten($bwarning-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($bwarning-dark, 0%),
        0 1px 1px lighten($bwarning-dark, 20%), 0 0 4px white;
      color: lighten($bwarning-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($bwarning-dark, 40%), 15%) 0%,
        saturate(darken($bwarning-dark, 25%), 10%) $depth
      );
    }
  }

  .button_danger {
    text-shadow: 0.03em -0.06em 0 darken($bdanger-dark, 20%),
      0 1px 1px lighten($bdanger-dark, 11%);
    color: darken($bdanger-dark, 10%);
    &:visited {
      color: darken($bdanger-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($bdanger-dark, 9%), 35%) 0%,
      saturate(lighten($bdanger-dark, 2%), 15%) 26%,
      $bdanger-dark 100%
    );
    border-top: 1px solid lighten($bdanger-dark, 22%);
    border-bottom: 1px solid lighten($bdanger-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($bdanger-dark, 9%), 35%), $lighten-on-hover) 0%,
        lighten(saturate(lighten($bdanger-dark, 2%), 15%), $lighten-on-hover)
          26%,
        lighten($bdanger-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($bdanger-dark, 0%),
        0 1px 1px lighten($bdanger-dark, 20%), 0 0 4px white;
      color: lighten($bdanger-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($bdanger-dark, 17%), 15%) 0%,
        saturate(darken($bdanger-dark, 12%), 10%) $depth
      );
    }
  }

  .button_info {
    text-shadow: 0.03em -0.06em 0 darken($binfo-dark, 20%),
      0 1px 1px lighten($binfo-dark, 11%);
    color: darken($binfo-dark, 10%);
    &:visited {
      color: darken($binfo-dark, 10%);
    }
    background: linear-gradient(
      to bottom,
      saturate(lighten($binfo-dark, 9%), 35%) 0%,
      saturate(lighten($binfo-dark, 2%), 15%) 26%,
      $binfo-dark 100%
    );
    border-top: 1px solid lighten($binfo-dark, 22%);
    border-bottom: 1px solid lighten($binfo-dark, 20%);
    &:hover {
      background: linear-gradient(
        to bottom,
        lighten(saturate(lighten($binfo-dark, 9%), 35%), $lighten-on-hover) 0%,
        lighten(saturate(lighten($binfo-dark, 2%), 15%), $lighten-on-hover) 26%,
        lighten($binfo-dark, $lighten-on-hover) 100%
      );
    }
    &:active {
      text-shadow: 0 -2px 0 darken($binfo-dark, 0%),
        0 1px 1px lighten($binfo-dark, 20%), 0 0 4px white;
      color: lighten($binfo-dark, 45%);
      &:before {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.7), 0 3px 9px rgba(0, 0, 0, 0.2);
      }
    }
    &:before {
      background: linear-gradient(
        to top,
        saturate(darken($binfo-dark, 17%), 15%) 0%,
        saturate(darken($binfo-dark, 12%), 10%) $depth
      );
    }
  }
}
</style>
