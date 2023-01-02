export type TranslationData = {
    menu : {
        back: string,
        logo: string,
        about: string,
        projects: string,
        repos: string,
        credits: string,
        theme: string
    },
    portfolio : {
        greetings: string[],
        buzzwords: string[]
    },
    greeting : {
        title: string,
        theme: string,
        dark: string,
        contrast: string,
        done: string
    },
    about : {
        me: string
        skills : {
            title: string,
            programming: {
                label: string,
                years_of_experience: number
            }[],
            ide: string,
            other: string,
            short: string,
            year: string
        },
        os : {
            title: string,
            content: string,
            desktop: string
        },
        story : {
            title: string,
            content: string[][]
        }
    },
    projects : {
        title: string,
        loading: string,
        open: string
    },
    repos : {
        personal: string,
        panel : {
            archived: string,
            forked: string,
            nodescription: string
        },
        loading: string
    },
    credits : {
        title: string,
        framework: string,
        people: string,
        ukraine: string
    },
    special : {
        title: string,
        link: string
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

export enum TextAnimationState {
    Typing,
    TypingEnd,
    Deleting,
    DeletingEnd
}