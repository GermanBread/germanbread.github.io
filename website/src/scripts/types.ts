export type TranslationData = {
    menu : {
        back,
        logo,
        about,
        projects,
        repos,
        credits,
        theme
    },
    portfolio : {
        buzzwords : string[]
    },
    greeting : {
        title,
        theme,
        dark,
        contrast,
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
        people,
        ukraine
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