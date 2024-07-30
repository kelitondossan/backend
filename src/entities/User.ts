import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: 0 })
    points: number;

    constructor(username?: string, password?: string, points?: number) {
        this.username = username || '';
        this.password = password || '';
        this.points = points || 0;
    }
}
