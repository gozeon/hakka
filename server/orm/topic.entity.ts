import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Comment } from './comment.entity'
import { Node } from './node.entity'
import { UserTopicLike } from './user-topic-like.entity'

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne((type) => User, (user) => user.topics)
  author: User

  @Column()
  authorId: number

  @OneToMany((type) => Comment, (comment) => comment.topic)
  comments: Comment[]

  @ManyToOne((type) => Node, (node) => node.topics)
  node: Node

  @Column()
  nodeId: number

  @OneToMany((type) => UserTopicLike, (u) => u.topic)
  userTopicLikes: UserTopicLike[]

  @Column({ nullable: true })
  lastCommentId?: number

  @OneToOne((type) => Comment, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  lastComment?: Comment
}
