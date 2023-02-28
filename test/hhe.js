function ReplaceSuggestedText(e, t, n) {
    let i = this.m_refTextInput.current.selectionStart
      , o = this.m_refTextInput.current.value
      , r = this.FindMatchOpener(e, o, i);
    if (void 0 === r && "@" == e && (r = this.FindMatchOpener("ï¼ ", o, i)),
    void 0 !== r) {
        let e = o.substr(0, r);
        e += t,
        (i >= o.length || " " != o[i]) && !arguments[2] && (e += " ");
        let a = e.length;
        e += o.substr(i),
        this.SetMessageInput(e, n),
        this.m_refTextInput.current.value = e,
        this.m_refTextInput.current.selectionStart = this.m_refTextInput.current.selectionEnd = a,
        this.FocusTextInput()
    }
}