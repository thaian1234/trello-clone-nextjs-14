import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
	entityId: string;
	entityType: ENTITY_TYPE;
	entityTitle: string;
	action: ACTION;
}

export const createAuditLog = async (props: Props) => {
	try {
		const { orgId } = auth();
		const user = await currentUser();

		if (!user || !orgId) throw new Error("User not found");

		const { entityId, entityTitle, entityType, action } = props;

		const auditLogData = await db.auditLog.create({
			data: {
				orgId,
				entityId,
				entityType,
				entityTitle,
				action,
				userId: user.id,
				userImage: user?.imageUrl,
				userName: user?.firstName + " " + user?.lastName,
			},
		});

		if (!auditLogData) throw new Error("Cannot create auditlog");

		return auditLogData;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
