<script context="module">
    export async function load({url}) {
        return {
            status: 302,
            redirect: "https://web.archive.org/" + String(url).split('3000/')[1]
        };
    }
</script>