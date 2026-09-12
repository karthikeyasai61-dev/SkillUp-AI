import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore as getFirestoreAdmin } from 'firebase-admin/firestore';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let firestoreInstance = null;
let firebaseApp = null;
let isInitialized = false;
export function initFirebase() {
    if (isInitialized && firestoreInstance) {
        return firestoreInstance;
    }
    try {
        const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');
        if (!fs.existsSync(serviceAccountPath)) {
            console.warn('⚠️ firebase-service-account.json not found at:', serviceAccountPath);
            return null;
        }
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        if (serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
        if (getApps().length === 0) {
            firebaseApp = initializeApp({
                credential: cert(serviceAccount),
                projectId: serviceAccount.project_id || 'skillup-ai-aa9ab'
            });
        }
        else {
            firebaseApp = getApps()[0];
        }
        firestoreInstance = getFirestoreAdmin(firebaseApp);
        firestoreInstance.settings({ ignoreUndefinedProperties: true });
        isInitialized = true;
        console.log(`🔥 Firebase Firestore initialized successfully for project: ${serviceAccount.project_id}`);
        return firestoreInstance;
    }
    catch (error) {
        console.error('❌ Failed to initialize Firebase Firestore:', error);
        return null;
    }
}
export function getFirestore() {
    if (!firestoreInstance) {
        return initFirebase();
    }
    return firestoreInstance;
}
// ------------------------------------------------------------------
// FIRESTORE CLOUD PERSISTENCE HELPERS
// ------------------------------------------------------------------
export async function firestoreSaveUser(user) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('users').doc(user.id).set({
            ...user,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveUser error:', err);
    }
}
export async function firestoreSaveProfile(userId, profile) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('student_profiles').doc(userId).set({
            userId,
            ...profile,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveProfile error:', err);
    }
}
export async function firestoreSaveCurriculum(curriculum) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('curricula').doc(curriculum.id).set({
            ...curriculum,
            createdAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveCurriculum error:', err);
    }
}
export async function firestoreSavePersonalizedCurriculum(userId, pcurr) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('personalized_curricula').doc(userId).set({
            userId,
            ...pcurr,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore savePersonalizedCurriculum error:', err);
    }
}
export async function firestoreSaveSemesterPlan(userId, plan) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('semester_plans').doc(userId).set({
            userId,
            ...plan,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveSemesterPlan error:', err);
    }
}
export async function firestoreSaveWeeklyPlan(userId, weekData) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        const docId = `${userId}_week_${weekData.week_number || weekData.weekNumber || 1}`;
        await db.collection('weekly_plans').doc(docId).set({
            userId,
            ...weekData,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveWeeklyPlan error:', err);
    }
}
export async function firestoreSaveDailyTasks(userId, tasks) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        const batch = db.batch();
        for (const task of tasks) {
            const docRef = db.collection('daily_tasks').doc(task.id);
            batch.set(docRef, {
                userId,
                ...task,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        }
        await batch.commit();
    }
    catch (err) {
        console.warn('Firestore saveDailyTasks error:', err);
    }
}
export async function firestoreUpdateTaskStatus(taskId, status) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('daily_tasks').doc(taskId).set({
            status,
            completedAt: status === 'completed' ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore updateTaskStatus error:', err);
    }
}
export async function firestoreSaveMilestone(userId, milestone) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('milestones').doc(milestone.id).set({
            userId,
            ...milestone,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveMilestone error:', err);
    }
}
export async function firestoreSaveAssessment(userId, assessment) {
    const db = getFirestore();
    if (!db)
        return;
    try {
        await db.collection('assessments').doc(assessment.id || `assess_${Date.now()}`).set({
            userId,
            ...assessment,
            createdAt: new Date().toISOString()
        }, { merge: true });
    }
    catch (err) {
        console.warn('Firestore saveAssessment error:', err);
    }
}
