import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "@agent-native/core/client/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";

type FooterDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

const FIELD_MAX_LENGTH = 2000;

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

export function NewsletterDialog({ open, onOpenChange }: FooterDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="site-dialog-overlay" />
        <Dialog.Content className="site-dialog">
          <Dialog.Title className="site-dialog-title">Спасибо за подписку!</Dialog.Title>
          <Dialog.Description className="site-dialog-text">Спасибо за подписку на нашу рассылку, проверяйте уведомления на электронной почте.</Dialog.Description>
          <Dialog.Close className="site-dialog-close" aria-label="Закрыть">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function FeedbackDialog({ open, onOpenChange }: FooterDialogProps) {
  const { session } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [remark, setRemark] = useState("");
  const [sent, setSent] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSent(false);
      setQuestion("");
      setRemark("");
    }
    onOpenChange(nextOpen);
  }

  function fillUserData() {
    setUsername(session?.name ?? "");
    setEmail(session?.email ?? "");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setQuestion("");
    setRemark("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="site-dialog-overlay" />
        <Dialog.Content className="site-dialog site-dialog-wide">
          <Dialog.Title className="site-dialog-title">Обратная связь</Dialog.Title>
          <Dialog.Description className="site-dialog-text">Предложите доработку, напишите возражение или задайте вопрос.</Dialog.Description>
          <form className="site-dialog-form" onSubmit={handleSubmit}>
            <label className="site-dialog-field">Имя пользователя
              <input type="text" required value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label className="site-dialog-field">Эл. почта
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="site-dialog-field">Вопрос
              <textarea required rows={4} maxLength={FIELD_MAX_LENGTH} value={question} onChange={(event) => setQuestion(event.target.value)} />
            </label>
            <label className="site-dialog-field">Замечание или возражение
              <textarea rows={4} maxLength={FIELD_MAX_LENGTH} value={remark} onChange={(event) => setRemark(event.target.value)} />
            </label>
            <div className="site-dialog-actions">
              <button type="button" className="site-dialog-secondary" onClick={fillUserData}>Автоматически заполнить данные</button>
              <button type="submit" className="site-dialog-submit">Отправить</button>
            </div>
          </form>
          {sent && <p className="site-dialog-status">Спасибо! Ваше сообщение принято.</p>}
          <Link className="site-dialog-home" to="/" onClick={() => handleOpenChange(false)}><IconArrowLeft size={16} /> На главную</Link>
          <Dialog.Close className="site-dialog-close" aria-label="Закрыть">×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
