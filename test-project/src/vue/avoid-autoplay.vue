<template>
  <video autoplay></video> <!-- NonCompliant Avoid autoplay and set preload='none' for video and audio elements. -->
  <video preload="auto"></video> <!-- NonCompliant Avoid autoplay and set preload='none' for video and audio elements. -->
  <video preload="none"></video> <!-- Compliant -->
</template>