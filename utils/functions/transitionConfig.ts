import gsap from 'gsap';

import { useTransitionComposable } from '~/composables/transition-composable';

const { toggleTransitionComplete } = useTransitionComposable();

export const leftTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el: string, done: (...args: any[]) => void | null) => {
    gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
    gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
      .to(el, { scale: 1, duration: 0.25 })
      .play();
  },
  onLeave: (el: string, done: (...args: any[]) => void | null) => {
    toggleTransitionComplete(false);
    gsap
      .timeline({ paused: true, onComplete: done })
      .to(el, { scale: 0.8, duration: 0.2 })
      .to(el, { xPercent: -100, autoAlpha: 0, duration: 0.2 })
      .play();
  },
};

export const rightTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el: string, done: (...args: any[]) => void | null) => {
    gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: 100 });
    gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
      .to(el, { scale: 1, duration: 0.25 })
      .play();
  },
  onLeave: (el: string, done: (...args: any[]) => void | null) => {
    toggleTransitionComplete(false);
    gsap
      .timeline({ paused: true, onComplete: done })
      .to(el, { scale: 0.8, duration: 0.2 })
      .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
      .play();
  },
};

export const frontTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el: string, done: (...args: any[]) => void | null) => {
    gsap.set(el, { autoAlpha: 0, scale: 0.8 });
    gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, { autoAlpha: 1, scale: 1, duration: 0.25 })
      .play();
  },
  onLeave: (el: string, done: (...args: any[]) => void | null) => {
    toggleTransitionComplete(false);
    gsap
      .timeline({ paused: true, onComplete: done })
      .to(el, { scale: 0.8, duration: 0.2 })
      .play();
  },
};
