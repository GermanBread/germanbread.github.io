// Paste into browser for list of projects
async function fetchRepos(repos) {
    const data = [];
    for (const index in repos) {
        const repo = repos[index];
        await fetch(repo).then(async (res) => {
            if (!res.ok)
                throw res.status;
            let { name, description, archived, fork, license, html_url } = await res.json();
            const { spdx_id } = license ?? { spdx_id : null };
            await data.push({ src : repo, name : name, description : description, archived : archived, forked : fork, license : spdx_id, url : html_url })
        }).catch((err) => {
            console.error(err);
            data.push({ src : repo, error : err });
        })
    }
    return data;
}

fetchRepos([
    "https://api.github.com/repos/GermanBread/Arnix",
    "https://api.github.com/repos/GermanBread/Frutti",
    "https://api.github.com/repos/GermanBread/Breds-brainfuck-interpreter",
    "https://api.github.com/repos/GermanBread/Mate",
    "https://api.github.com/repos/GermanBread/AppImageUpdater",
    "https://api.github.com/repos/GermanBread/OpenTkPain",
    "https://api.github.com/repos/GermanBread/germanbread.github.io"
]).then((res) => {
    console.log(JSON.stringify(res));
});





// Paste into browser to acquire the list of all my repositories
fetch("https://api.github.com/users/GermanBread/repos").then(async (res) => {
    const json = await res.json();
    const output = [];
    for (const index in json) {
        const repo = json[index];
        const { name, description, archived, fork, license, html_url } = repo;
        const { spdx_id } = license ?? { spdx_id : null };
        await output.push({ name : name, description : description, archived : archived, forked : fork, license : spdx_id, url : html_url })
    }
    console.log(JSON.stringify(output));
});