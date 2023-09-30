<script lang="ts">
    let apiKey = "";
    function login() {
        localStorage.setItem("apiKey", apiKey);
        window.location.replace("/");
    }
</script>

<form on:submit={login}>
    <div class="mb-3">
        <label class="form-label">Api key</label>
        <input type="text" class="form-control" name="apiKey" bind:value={apiKey}/>
    </div>
    <button class="btn btn-success m-2">Submit</button>
    <a href="/user/register" class="btn btn-warning m-2">Register</a>
</form>