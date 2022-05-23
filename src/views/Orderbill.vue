<template>
    <h1>测试页</h1>
    <son>
        <template #header>
            <h1>hello</h1>
        </template>
        <template #default="{dat}">
            <div>{{dat}}</div>
        </template>
        <template #[bevalue]>
            <div>world</div>
        </template>
        <template #footer>
            <button>ok</button>
        </template>
    </son>

</template>
<script setup>
    import son from './son.vue'
    import {ref} from 'vue'
    const bevalue=ref("header")
</script>
