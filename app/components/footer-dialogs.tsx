import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";

type FooterDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

export function MissionDialog({ open, onOpenChange }: FooterDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="site-dialog-overlay" />
        <Dialog.Content className="site-dialog">
          <Dialog.Title className="site-dialog-title">Наша миссия</Dialog.Title>
          <Dialog.Description className="site-dialog-text">Миссия нашего проекта — сохранить историческую память и передать её будущим поколениям. Мы верим, что знание прошлого помогает осознать настоящее и уверенно строить будущее. Наша платформа — это мост между великими страницами истории России и современным человеком.</Dialog.Description>
          <blockquote className="site-dialog-quote">Чем лучше мы знаем прошлое, тем увереннее идём вперёд.</blockquote>
          <Link className="site-dialog-home" to="/" onClick={() => onOpenChange(false)}><IconArrowLeft size={16} /> На главную</Link>
          <Dialog.Close className="site-dialog-close" aria-label="Закрыть">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function FeedbackDialog({ open, onOpenChange }: FooterDialogProps) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSent(false);
      setMessage("");
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setMessage("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="site-dialog-overlay" />
        <Dialog.Content className="site-dialog">
          <Dialog.Title className="site-dialog-title">Обратная связь</Dialog.Title>
          <Dialog.Description className="site-dialog-text">Предложите доработку, напишите возражение или задайте вопрос.</Dialog.Description>
          <form className="site-dialog-form" onSubmit={handleSubmit}>
            <input type="text" required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ваш вопрос или замечание" aria-label="Ваш вопрос или замечание" />
            <button type="submit">Отправить</button>
          </form>
          {sent && <p className="site-dialog-status">Спасибо! Ваше сообщение принято.</p>}
          <Link className="site-dialog-home" to="/" onClick={() => handleOpenChange(false)}><IconArrowLeft size={16} /> На главную</Link>
          <Dialog.Close className="site-dialog-close" aria-label="Закрыть">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
