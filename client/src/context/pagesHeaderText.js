const pagesHeaderText = {
    "index": {
        headerTitle: <>
            <span className="header__text-string">
                Hi <span className="header__text-highlight">-</span> I{"\u2019"}m Igor
            </span>
            <span className="header__text-string">
                I{"\u2019"}m Backend <span className="header__text-highlight">-</span> developer
            </span>
        </>
    },
    "works": {
        headerTitle: <>These are my works <span className="header__text-highlight">:</span></>,
        headerSubtitle: "These works were done by me while I was studying and working as a freelancer.",
        panelIcon: "book.svg"
    },
    "feedbacks": {
        headerTitle: <>These are the reviews that were left to me <span className="header__text-highlight">:</span></>,
        panelIcon: "chat.svg"
    },
    "about": {
        headerTitle: <>
            <span className="header__text-string">
                About me <span className="header__text-highlight">&&</span>
            </span>
            <span className="header__text-string">
                this website <span className="header__text-highlight">^_^</span>
            </span>
        </>,
        headerSubtitle: "This website was made for fun, gaining new experience, honing skills and of course for my clients or employers.",
        panelIcon: "question.svg"
    }
}

export default pagesHeaderText;