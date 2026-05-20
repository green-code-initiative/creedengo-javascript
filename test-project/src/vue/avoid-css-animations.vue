<template>
  <div style="border: 1px solid #000; transition: width 2s;"></div> <!-- NonCompliant Avoid using transition in CSS. -->
  <div style="border: 1px solid #000;"></div> <!-- Compliant -->
</template>