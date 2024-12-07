export type TranslationData = {
    menu : {
        github,
        about,
        projects,
        repos,
        credits,
        theme
    },
    greeting : {
        title,
        palette,
        done
    },
    about : {
        me
        skills : {
            title,
            programming,
            ide,
            other,
            short
        },
        os : {
            title,
            content,
            desktop
        },
        story : {
            title,
            content : string[][]
        }
    },
    projects : {
        title,
        loading
    },
    repos : {
        personal,
        panel : {
            archived,
            forked,
            nodescription
        },
        loading
    },
    credits : {
        title,
        framework,
        people
    }
}

export type RepoData = [
    {
        src,
        error,
        name,
        description,
        archived,
        forked,
        license,
        url
    }
]