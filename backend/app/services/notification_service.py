from sqlalchemy.orm import Session
from ..models import notification, user, question, answer
from ..schemas.notification import NotificationCreate
import re

class NotificationService:
    @staticmethod
    def create_answer_notification(db: Session, question_id: int, answer_id: int, answer_author_id: int):
        """Create notification when someone answers a question"""
        db_question = question.get_question(db, question_id)
        if not db_question:
            return
        
        # Don't notify if the question author is answering their own question
        if db_question.author_id == answer_author_id:
            return
        
        db_answer_author = user.get_user(db, answer_author_id)
        if not db_answer_author:
            return
        
        notification_data = NotificationCreate(
            user_id=db_question.author_id,
            type="answer",
            title="New Answer",
            message=f"{db_answer_author.username} answered your question: {db_question.title}",
            related_question_id=question_id,
            related_answer_id=answer_id,
            related_user_id=answer_author_id
        )
        
        notification.create_notification(db, notification_data)

    @staticmethod
    def create_mention_notifications(db: Session, content: str, author_id: int, question_id: int = None, answer_id: int = None):
        """Create notifications for @mentions in content"""
        # Find all @mentions in the content
        mentions = re.findall(r'@(\w+)', content)
        
        for username in mentions:
            db_mentioned_user = user.get_user_by_username(db, username)
            if db_mentioned_user and db_mentioned_user.id != author_id:
                db_author = user.get_user(db, author_id)
                if not db_author:
                    continue
                
                notification_data = NotificationCreate(
                    user_id=db_mentioned_user.id,
                    type="mention",
                    title="You were mentioned",
                    message=f"{db_author.username} mentioned you in a {'question' if question_id else 'answer'}",
                    related_question_id=question_id,
                    related_answer_id=answer_id,
                    related_user_id=author_id
                )
                
                notification.create_notification(db, notification_data)

    @staticmethod
    def create_vote_notification(db: Session, item_id: int, item_type: str, voter_id: int):
        """Create notification when someone votes on your content"""
        if item_type == "question":
            db_item = question.get_question(db, item_id)
        else:
            db_item = answer.get_answer(db, item_id)
        
        if not db_item or db_item.author_id == voter_id:
            return
        
        db_voter = user.get_user(db, voter_id)
        if not db_voter:
            return
        
        notification_data = NotificationCreate(
            user_id=db_item.author_id,
            type="vote",
            title="New Vote",
            message=f"{db_voter.username} voted on your {item_type}",
            related_question_id=item_id if item_type == "question" else None,
            related_answer_id=item_id if item_type == "answer" else None,
            related_user_id=voter_id
        )
        
        notification.create_notification(db, notification_data)

    @staticmethod
    def create_accept_notification(db: Session, answer_id: int, question_owner_id: int):
        """Create notification when an answer is accepted"""
        db_answer = answer.get_answer(db, answer_id)
        if not db_answer or db_answer.author_id == question_owner_id:
            return
        
        db_question_owner = user.get_user(db, question_owner_id)
        if not db_question_owner:
            return
        
        notification_data = NotificationCreate(
            user_id=db_answer.author_id,
            type="accept",
            title="Answer Accepted",
            message=f"{db_question_owner.username} accepted your answer",
            related_question_id=db_answer.question_id,
            related_answer_id=answer_id,
            related_user_id=question_owner_id
        )
        
        notification.create_notification(db, notification_data)
