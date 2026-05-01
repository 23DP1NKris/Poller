const tips = [
    { text: 'Kopīgo savu aptaujas saiti sociālajos tīklos, lai sasniegtu vairāk cilvēku.', level: 'tip' },
    { text: 'Izmanto kategorijas, lai atvieglotu aptauju atklāšanu sadaļā "Atklāt".', level: 'tip' },
    { text: 'Aktivizē aptaujas melnrakstā, lai sāktu saņemt atbildes.', level: 'tip' },
]

function useNotifications(polls) {
    const milestones = []
    for (const poll of polls) {
        const count = poll.responses_count ?? 0
        if (count >= 100) milestones.push({ text: `Aptauja "${poll.title}" saņēma 100 atbildes!`, level: 'success', pollId: poll.id })
        else if (count >= 50) milestones.push({ text: `Aptauja "${poll.title}" saņēma 50 atbildes!`, level: 'success', pollId: poll.id })
        else if (count >= 10) milestones.push({ text: `Aptauja "${poll.title}" saņēma 10 atbildes!`, level: 'info', pollId: poll.id })
        else if (count >= 1) milestones.push({ text: `Aptauja "${poll.title}" saņēma pirmo atbildi!`, level: 'info', pollId: poll.id })
    }

    const notifications = milestones.length > 0 ? milestones : tips

    return { notifications, milestones }
}

export default useNotifications
