<script lang="ts">
    import { enhance } from "$app/forms";
    import Card from "$lib/components/common/Card.svelte";
    import { notifications } from "$lib/stores";
    import type { ActionData } from "../$types";
    import Button from "$lib/components/common/Button.svelte";
    import Link from "$lib/components/common/Link.svelte";
    import Input from "$lib/components/common/Input.svelte";

    export let form: ActionData

    $: if (form?.message) {
        notifications.error(form.message)
    }

    let apiKey = "";
</script>

<div class="bg-secondary w-screen h-screen flex justify-center items-center">
    <Card>
        <form method=POST action="/user?/login" use:enhance>
            <div class="mb-3 flex flex-col">
                <label class="form-label">Log in by entering you API key</label>
                <Input name="apiKey" required bind:value={apiKey}/>
            </div>
            <Button>Submit</Button>
            <Button>
                <Link href="/user/register">
                    Register
                </Link>
            </Button>
        </form>
    </Card>
</div>